<script setup>
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; // Import useRouter
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import axios from 'axios';

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter(); // Initialize the router
const matricule = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  errorMessage.value = ''; // Clear previous error messages
  try {
    const response = await axios.post('https://taxefy.ggsdrc.com/index.php/api/vue/login', {
      matricule: matricule.value,
      password: password.value,
    });

    // Log the full API response for debugging
    console.log('API Response:', JSON.stringify(response.data, null, 2));

    // Check if response and response.data exist
    if (response && response.data) {
      if (response.data.status) {
        const userData = response.data.user; // Adjusted to access user data

        // Log userData for debugging
        console.log('User Data:', JSON.stringify(userData, null, 2));

        // Ensure userData is defined and has the matricule property
        if (userData && typeof userData === 'object' && Object.prototype.hasOwnProperty.call(userData, 'matricule')) {
          console.log('Login successful, Matricule:', userData.matricule);

          // Store matricule and user data in localStorage
          localStorage.setItem('matricule', userData.matricule);  // Store matricule separately
          localStorage.setItem('user', JSON.stringify(userData)); // Store user data

          // Redirect to dashboard
          router.push('/dashboard-default');
        } else {
          errorMessage.value = 'User data or matricule not found in the response';
        }
      } else {
        // Handle unsuccessful login
        errorMessage.value = response.data.message || 'Login failed'; // Set error message
      }
    } else {
      // Handle unexpected response structure
      errorMessage.value = 'Unexpected response structure from the server';
    }
  } catch (error) {
    errorMessage.value = 'An error occurred: ' + error.message; // Catch and display any errors
  }
};


onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <!-- Optional Navbar or other components -->
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">CONNEXION</h4>
                  <p class="mb-0">Portail TaxFy Admin</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login" role="form">
                    <div class="mb-3">
                      <argon-input
                        id="matricule"
                        type="text"
                        placeholder="Poste"
                        name="matricule"
                        size="lg"
                        v-model="matricule"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        size="lg"
                        v-model="password"
                      />
                    </div>
                    <argon-switch id="rememberMe" name="remember-me"
                      >Se souvenir de moi</argon-switch
                    >

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        >Se Connecter</argon-button
                      >
                    </div>
                    <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Le digital guide nos actions"
                </h4>
                <p class="text-white position-relative">
                  Dans une dynamique d'assainir le cadre de travail, et d'assurer la performance des agents terrains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
