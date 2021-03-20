<template>
    <div>
        <Menubar :model="menu">
             <template #start>
                <div class="p-d-flex">
                    <div><Button type="button" icon="pi pi-cloud" label="Not Connected" @click="toggleConnectDialog"/></div>
                    <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px">
                        <div class="p-grid p-flex-column">
                            <div class="p-row">
                                <div class="p-grid p-jc-start">
                                    <div class="p-col-2">
                                        Server
                                    </div>
                                    <div class="p-col-6">
                                        <InputText id="servername" type="text" v-model="servername" style="width: 270px"/>
                                    </div>
                                </div>
                            </div>
                            <div class="p-row">
                                <div class="p-grid p-jc-start">
                                    <div class="p-col-2">
                                        Username
                                    </div>
                                    <div class="p-col-1">
                                        <InputText id="username" type="text" v-model="username" style="width: 270px"/>
                                    </div>
                                </div>
                            </div>
                            <div class="p-row">
                                <div class="p-grid p-jc-start">
                                    <div class="p-col-2">
                                        Password
                                    </div>
                                    <div class="p-col-1">
                                        <Password id="password" type="text" :feedback="false" toggleMask v-model="password"/>
                                    </div>
                                </div>
                            </div>
                            <div class="p-row">
                                <div class="p-grid p-jc-end">
                                    <Button type="button" label="Connect" @click="connectToServer"/>
                                </div>
                            </div>
                        </div>
                    </OverlayPanel>
                </div>
            </template>
             <template #end>
                <div class="p-d-flex">
                    <div class="p-mr-2"><InputText placeholder="Search" type="text" v-model="filters['global']"/></div>
                    <div class="p-mr-2"><Button type="button" icon="pi pi-plus" label="Expand All" @click="expandAll"/></div>
                    <div><Button type="button" icon="pi pi-minus" label="Collapse All" @click="collapseAll"/></div>
                </div>
            </template>
        </Menubar>
        <Splitter style="height: 800px">
            <SplitterPanel>
                <ScrollPanel>
                    <TreeTable :value="atree" :filters="filters" :expandedKeys="expandedKeys" filterMode="lenient" class="" selectionMode="single" v-model:selectionKeys="selectedTopic" @node-select="onSelectedTopicChanged" style="padding: 0; max-height: 780px;">
                        <Column field="node" header="Topic" headerStyle="width:300px" :expander="true"></Column>
                        <!-- <Column field="topic" header="Topic"></Column> -->
                        <Column field="message" header="Message" bodyClass="p-text-nowrap p-text-truncate"></Column>
                        <Column field="counter" header="Counter" headerStyle="width:100px" bodyStyle="text-align: center"></Column>
                    </TreeTable>
                </ScrollPanel>
            </SplitterPanel>
            <SplitterPanel :size="30">
                <ScrollPanel>
                    <pre v-highlightjs><code style="min-width: 700px; min-height: 780px; max-width: 700px; max-height: 780px;" class="json">{{selectedTopicDetail}}</code></pre>
                </ScrollPanel>
            </SplitterPanel>
        </Splitter>
    </div>
</template>

<script>
//import {defineComponent, ref} from "vue"
import {useToast} from 'primevue/usetoast'
import  mqtt  from 'mqtt'

export default {
    components: {},
    props: {
    },
    data () {
        return {
            toast: useToast(),
            text: 'Prime',
            data: [{topic: 'topic1', content: 'content1'}],
            selectedTopic: null,
            selectedTopicObject: null,
            selectedTopicDetail : null,
            atree: null,
            tree: {},
            linenumber: true,
            menu: [{label: 'MQTTConqueror'}],
            filters: {},
            expandedKeys: {},
            servername: 'mqtt://192.168.1.104:1884',
            password: null,
            username: null,
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        create_UUID() {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c=='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        },
        fillTree(name,steps, message) {
            var current = null,
            existing = null,
            i = 0;
            for (var y = 0; y < steps.length; y++) {
                if (y==0) {
                    if (!this.tree.children||typeof this.tree.children == 'undefined'){
                        this.tree = { key: this.create_UUID(), label: steps[y], data: {node: steps[y], counter: 0}, children: [] };
                    }
                    this.tree.data.counter = this.tree.data.counter + 1
                    current = this.tree.children;
                } else {
                    existing = null;
                    for (i=0; i < current.length; i++) {
                        if (current[i].label === steps[y]) {
                            existing = current[i];
                            break;
                        }
                    }
                    if (existing) {
                        current = existing.children;
                    } else {
                        current.push({ key: this.create_UUID(), label: steps[y], data: {node: steps[y], message: y == steps.length -1 ? message : null, counter: 1, topic: y == steps.length -1 ? name : null }, children: [] });
                        current = current[current.length - 1].children;
                    }
                }
                // Update existing
                if(existing && existing.data) {
                    existing.data.counter = existing.data.counter + 1
                    if(y === steps.length - 1){
                        existing.data.message = message
                        if(this.selectedTopicObject && this.selectedTopicObject.key == existing.key){
                            this.onSelectedTopicChanged(existing)
                        }
                    }
                }
            }
        },
        onSelectedTopicChanged(a) {
            this.selectedTopicObject = a
            try {
                this.selectedTopicDetail = JSON.stringify(JSON.parse(a.data.message), null, 2)
            } catch (error) {
                this.selectedTopicDetail = a.data.message
            }
        },
        expandAll() {
            for (let node of this.atree) {
                this.expandNode(node);
            }

            this.expandedKeys = {...this.expandedKeys};
        },
        collapseAll() {
            this.expandedKeys = {};
        },
        expandNode(node) {
            if (node.children && node.children.length) {
                this.expandedKeys[node.key] = true;

                for (let child of node.children) {
                    this.expandNode(child);
                }
            }
        },
        toggleConnectDialog(event){
            this.$refs.op.toggle(event);
        },
        connectToServer(){
            const client = mqtt.connect(this.servername, {username: this.username, password: this.password})
            client.on('message', (topic, message) => {
                var test = "myhome/" + topic
                var steps = test.split('/');

                this.fillTree(topic, steps, message.toString())
                this.atree = [this.tree]
            })
            client.on('error', (message) => {
                console.log('error ', message)
            })
            client.on('offline', () => {
                console.log('offline')
            })
            client.on('connect', () => {
                client.subscribe('#', (err) => {
                    if (!err) {
                        // console.log('connerr', err)
                    }
                })
                client.subscribe('$SYS/#', (err) => {
                    if (!err) {
                        // console.log('connerr', err)
                    }
                })
            })
        }
    },
    mounted () {
    }
}
</script>

<style >
</style>