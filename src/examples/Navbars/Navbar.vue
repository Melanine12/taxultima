<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
//import { useRoute } from "vue-router";
//import Breadcrumbs from "../Breadcrumbs.vue";
import { useRouter } from "vue-router";


const router = useRouter();

//const showMenu = ref(false);
const store = useStore();
const isRTL = computed(() => store.state.isRTL);


const matricule = ref('');

// Method to handle logout
const logout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('matricule');
  localStorage.removeItem('user');

  // Optionally reset store state if you're using Vuex for user state
  store.commit("resetUserState"); // Ensure you have a mutation for this if needed

  // Redirect to login page
  router.push({ name: 'Signin' }); // Replace with your login route
};

onMounted(() => {
  matricule.value = localStorage.getItem('matricule') || 'Unknown Matricule'; // Retrieve the matricule
});


//const minimizeSidebar = () => store.commit("sidebarMinimize");
//const toggleConfigurator = () => store.commit("toggleConfigurator");




</script>
<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <button @click="logout" class="btn btn-danger">Se deconnecter</button>
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="isRTL ? 'أكتب هنا...' : 'Rechercher...'"
            />
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <i class="fa fa-user" :class="isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
              <span v-if="isRTL" class="d-sm-inline d-none">يسجل دخول</span>
              <span v-else class="d-sm-inline d-none"><span class="text-white font-weight-bold px-3">
              Matricule: {{ matricule }}
            </span></span>
            
          </li>
         
         
          
        </ul>
      </div>
    </div>
  </nav>
</template>
