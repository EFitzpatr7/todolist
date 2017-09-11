<template>
    <div class="toDoList">
        <h1>To Do List
            <vue-particles
            color="#ff6166"
            :particleOpacity="0.7"
            :particlesNumber="140"
            shapeType="circle"
            :particleSize="4"
            linesColor="#ff6166"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"></vue-particles>
        </h1>
        <div class="content">
            <span class="button" v-on:click="formDisplay = !formDisplay">Add Post</span>
        </div>
            <form v-on:submit.prevent="makePost" v-bind:class="{formDisplay: formDisplay}">
                <label>Title:</label>
                <input type="text" v-model="newPost.title">
                <label>Content:</label>
                <input type="text" v-model="newPost.content">
                <p>Select Priority:</p>
                <label for="one">Low</label>
                <input type="radio" id="one" value="low" v-model="newPost.urgency">
                <label for="two">Medium</label>
                <input type="radio" id="two" value="medium" v-model="newPost.urgency">
                <label for="three">High</label>
                <input type="radio" id="three" value="high" v-model="newPost.urgency">

                <input type="submit" class="button block" label="New Post" v-on:click="formDisplay = !formDisplay">
            </form>
        <div class="content">
            <ul>
                <li v-for="post in posts" v-bind:class="post.urgency" v-on:click="removePost(post)">
                    <p>{{post.title}}</p>
                    <p>{{post.content}}</p>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import Firebase from 'firebase'

    let config = {
        apiKey: "AIzaSyAbIbxFo1_Zq6mcs2G5UIAIb3D-xWou3N0",
        authDomain: "to-do-vue.firebaseapp.com",
        databaseURL: "https://to-do-vue.firebaseio.com",
        projectId: "to-do-vue",
        storageBucket: "to-do-vue.appspot.com",
        messagingSenderId: "25822686915"
    }
    
    let app = Firebase.initializeApp(config);
    let db = app.database();

    let postsRef = db.ref('posts');

    export default {
        name: 'toDoList',
        firebase: {
            posts: postsRef
        },
        data() {
            return {
                formDisplay: false,
                newPost: {
                    title: '',
                    content: '',
                    urgency: ''
                },
            }
        },
        methods: {
            makePost: function() {
                postsRef.push(this.newPost);
                this.newPost.title = '';
                this.newPost.content = '';
                this.newPost.urgency = 'low';
            },
            removePost: function(post) {
                postsRef.child(post['.key']).remove();
            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
