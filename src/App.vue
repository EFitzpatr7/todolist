<template>
    <div id="app">
        <header>
            <div class="content">
                <a href="http://colourfullycreative.co.uk"><img class="logo" src="./assets/logo.png" /></a>
            </div>
        </header>

        <toDoList></toDoList>
    </div>
</template>

<script>
    import toDoList from './components/toDoList'

    export default {
        name: 'app',
        components: {
            toDoList
        },
    }
</script>

<style>

</style>