(function () {
  'use strict'

  angular
  .module('app')
  .component('editPost', {
    templateUrl: '/javascripts/posts/editPost.html',
    controller: controller
  })

  controller.$inject = ['$http', '$stateParams', '$state']

  function controller($http, $stateParams, $state) {
    const vm = this

    vm.$onInit = onInit
    vm.updatePost = updatePost

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(response => {
          vm.post = response.data
          $http.get(`/api/posts/${$stateParams.id}/comments`)
            .then(response => {
              vm.post.comments = response.data
            })
        })
    }

    function updatePost() {
      $http.patch(`/api/posts/${$stateParams.id}`, vm.post)
      .then(response => {
        $state.go('posts')
      })
    }
  }

}());
