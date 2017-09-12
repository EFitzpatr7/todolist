<template>
    <div class="toDoList">
        <h1>To Do List
            <vue-particles
            color="#4DB74A"
            :particleOpacity="0.7"
            :particlesNumber="140"
            shapeType="circle"
            :particleSize="2"
            linesColor="#4DB74A"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="80"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"></vue-particles>
        </h1>
        <div class="content">
            <span class="button" v-on:click="displayForm">Add Post</span>
            <span class="button" v-on:click="displayForm">Filter by</span>
        </div>
        <div class="coverOff" v-bind:class="{cover: formDisplay}" v-on:click="displayForm"></div>
        <form v-on:submit.prevent="makePost" v-bind:class="{formDisplay: formDisplay}">
            <label>Title:</label>
            <input type="text" placeholder="Enter title" v-model="newPost.title">
            <label>Customer:</label>
            <input type="text" placeholder="Enter title" v-model="newPost.customer">
            <label>Content:</label>
            <textarea placeholder="Enter content" v-model="newPost.content"></textarea>
            <p>Select Priority:</p>
            <label for="one">Low:</label>
            <input type="radio" id="one" value="low" v-model="newPost.urgency">
            <label for="two">Medium:</label>
            <input type="radio" id="two" value="medium" v-model="newPost.urgency">
            <label for="three">High:</label>
            <input type="radio" id="three" value="high" v-model="newPost.urgency">

            <input type="submit" class="button block" label="New Post" v-on:click="displayForm">
        </form>
        <div class="content">
            <ul>
                <li v-for="post in posts" v-bind:class="post.urgency">
                    <div>
                        <p class="title">{{post.title}}</p>
                        <p class="small">Customer: {{post.customer}}</p>
                        <p class="small">Completion: </p>
                        <p class="postContent">{{post.content}}</p>
                    </div>
                    <div class="bottomBar">
                        <p>find more</p>
                        <p class="delete" v-on:click="removePost(post)">Delete Post</p>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import Firebase from 'firebase'

    let config = {
        apiKey: "AIzaSyDN4FDgQibMJEgav8IMD7eAsJj455cldvM",
        authDomain: "to-do-list-d36b2.firebaseapp.com",
        databaseURL: "https://to-do-list-d36b2.firebaseio.com",
        projectId: "to-do-list-d36b2",
        storageBucket: "to-do-list-d36b2.appspot.com",
        messagingSenderId: "244264405173"
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
                    urgency: '',
                    customer: ''
                },
            }
        },
        methods: {
            makePost: function() {
                postsRef.push(this.newPost);
                this.newPost.title = '';
                this.newPost.content = '';
                this.newPost.urgency = 'low';
                this.newPost.customer = '';
            },
            removePost: function(post) {
                postsRef.child(post['.key']).remove();
            },
            filterPosts: function(urgency) {

            },
            displayForm: function() {
                this.formDisplay = !this.formDisplay;
            }
        }
    }

</script>

<style scoped>
    .coverOff {
        background: rgba(0, 0, 0, 0);
        transition: all 0.2s ease;
    }
    
    .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        cursor: pointer;
    }

</style>
