(function () {
  'use strict'

  angular
  .module('app')
  .component('posts', {
    require: {
      layout: '^app'
    },
    templateUrl: '/javascripts/posts/posts.html',
    controller: controller
  })

  controller.$inject = ['$http']

  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.showForm = showForm
    vm.makePost = makePost
    vm.voteUp = voteUp
    vm.voteDown = voteDown
    vm.createComment = createComment

    function onInit() {
      $http.get('/api/posts')
      .then((response) => {
        vm.posts = response.data
      })
    }

    function showForm() {
      vm.form =  !vm.form
    }

    function makePost() {
      $http.post('/api/posts', vm.post)
      .then((response) => {
        response.data.comments = []
        response.vote_count = 0
        vm.posts.push(response.data)
        vm.showForm()
        delete vm.post
      })
    }

    function createComment(post) {
      $http.post(`/api/posts/${post.id}/comments`, post.newComment)
      .then((response) => {
        post.comments.push(response.data)
        delete post.newComment
      })
    }

    function voteUp(post) {
      $http.post(`/api/posts/${post.id}/votes`)
      .then((response) => {
        post.vote_count = response.data.vote_count
      })
    }

    function voteDown(post) {
      if(post.vote_count == 0) return
      $http.delete(`/api/posts/${post.id}/votes`)
      .then((response) => {
        post.vote_count = response.data.vote_count
      })
    }

  }


}());
