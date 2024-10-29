<template>
   <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa fa-mobile"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">POS CONNECTES</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                {{ totalLoggedInUsers }}
                                <span class="wave-wrapper">
                                    <span class="green-circle"></span>
                                </span>
                            </h2>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
           
           
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-mobile"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">POS NON CONNECTES</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                {{ totalNotLoggedInUsers }}
                                <span class="wave-wrapper_red">
                                    <span class="red-circle"></span>
                                </span>
                            </h2>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
          </div>
         
        </div>
         
        <br />
        <div class="row">
            <div class="col-lg-6 col-md-6 col-12">
                <div class="card l-lg-grey">
                    <div class="logged-in-users-container">
                        <h3>LISTE POS CONNECTÉS</h3>
                        <div class="table-wrapper">
                            <table id="loggedInUsersTable" class="display" style="width:100%">
                                <thead>
                                    <tr>
                                    <th>Matricule</th>
                                    <th>Name</th>
                                    <th>Last Login Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in loggedInUsersToday" :key="user.user_id">
                                    <td>{{ user.matricule }}</td>
                                    <td>{{ user.nom_agent_logged }}</td>
                                    <td>{{ formatDate(user.last_login_time) }}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
                <div class="card l-lg-grey">
                    <div class="user-list-container">
                        <h3>LISTE POS NON CONNECTES</h3>
                       

                       
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
   </div>
</template>

<style>
.logged-in-users-container {
  max-width: 800px;
  margin: auto;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  font-size: 1.5em;
  color: #333;
  margin-bottom: 1em;
}

.table-wrapper {
  max-height: 400px; /* Set the maximum height for scrolling */
  overflow-y: auto;  /* Enable vertical scrolling */
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.user-table th {
  background-color: #007acc;
  color: white;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.no-data {
  text-align: center;
  color: #999;
  font-style: italic;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.red-circle {
  width: 10px;
  height: 10px;
  background-color: rgb(213, 3, 3);
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px; /* Adjusts spacing between number and circle */
  
}
.wave-wrapper {
  position: relative;
  display: inline-block;
  margin-left: 5px; /* Spacing between number and wave */
}

.wave-wrapper_red {
  position: relative;
  display: inline-block;
  margin-left: 5px; /* Spacing between number and wave */
}
/* Base green circle */
.green-circle {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  z-index: 1;
}

/* Ripple wave effect */
.wave-wrapper_red::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: rgba(0, 128, 0, 0.5); /* Semi-transparent green */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;

  /* Wave animation */
  animation: wave 1.5s infinite ease-out;
}

/* Ripple wave effect */
.wave-wrapper_red::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: rgba(237, 0, 0, 0.5); /* Semi-transparent green */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;

  /* Wave animation */
  animation: wave 1.5s infinite ease-out;
}

/* Ripple wave effect */
.wave-wrapper::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: rgba(0, 128, 0, 0.5); /* Semi-transparent green */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;

  /* Wave animation */
  animation: wave 1.5s infinite ease-out;
}

@keyframes wave {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5); /* Increase size for wave effect */
    opacity: 0; /* Fade out at the end */
  }
}
@keyframes pulse {
  0%, 100% {
    transform: scale(5);
    opacity: 1;
  }
  50% {
    transform: scale(1.3); /* Adjust scale for desired pulse size */
    opacity: 0.7; /* Adjust opacity for effect */
  }
}
.card {
    background-color: #fff;
    border-radius: 10px;
    border: none;
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-grey{
    background: linear-gradient(to right, #ffffff, rgb(220, 220, 220)) !important;
    color: #fff;
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #f09) !important;
    color: #fff;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #4286f4) !important;
    color: #fff;
}

.h5 {
    color: #fff;
}

.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
    color: #fff;
}

.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
    color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 110px;
}

.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: -5px;
    top: 20px;
    opacity: 0.1;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}

.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
    color: #fff;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.user-list-container {
  max-width: 100%;
  margin: auto;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  font-size: 1.5em;
  color: #333;
  margin-bottom: 1em;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  font-size: 1.1em;
}

.user-item:nth-child(odd) {
  background-color: #f0f8ff;
}

.user-matricule {
  font-weight: bold;
  color: #007acc;
}

.user-name {
  color: #333;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  list-style-type: none;
}

.page-item {
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e7e7e7;
}

.page-item:hover {
  background-color: #d0d0d0;
}

.active-page {
  background-color: #007acc;
  color: #fff;
  font-weight: bold;
}
</style>

<script>
/* global $ */
import axios from 'axios';
//import Paginate from 'vuejs-paginate-next';

export default {
    components: {
    
  },
  data() {
    return {
      totalLoggedInUsers: 0,
      totalNotLoggedInUsers: 0,
      usersNotLoggedInToday: [],
      loggedInUsersToday: [], // Array to store logged-in users
      currentPage: 1,
      usersPerPage: 5
    };
  },
  computed: {
    
   
  },
  methods: {
    async fetchTotalLoggedInUsers() {
      try {
        const response = await axios.get('https://taxefy.ggsdrc.com/index.php/api/getactiveuser');
        if (response.data.status) {
          this.totalLoggedInUsers = response.data.total_logged_in_users;
        } else {
          console.error("Failed to fetch the total logged-in users.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchTotalNotLoggedInUsers() {
      try {
        const response = await axios.get('https://taxefy.ggsdrc.com/index.php/api/getcountnotactiveuser');
        if (response.data.status) {
          this.totalNotLoggedInUsers = response.data.total_not_logged_in_today;
        } else {
          console.error("Failed to fetch the total logged-in users.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchUsersNotLoggedInToday() {
      try {
        const response = await axios.get('https://taxefy.ggsdrc.com/index.php/api/getnotactiveuser');
        if (response.data.status) {
          this.usersNotLoggedInToday = response.data.users_not_logged_in_today;
        } else {
          console.error("Failed to fetch the users who haven't logged in today.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://taxefy.ggsdrc.com/index.php/api/listactiveuser');
        if (response.data.status) {
          this.loggedInUsersToday = response.data.logged_in_users_today;
          this.totalLoggedInUsers = this.loggedInUsersToday.length; // Update total count
          console.log(response.data.logged_in_users_today);
          
          // Initialize DataTable after data is fetched
          this.$nextTick(() => {
            this.initializeDataTable('#loggedInUsersTable');
          });
        } else {
          console.error("Failed to fetch the logged-in users.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    initializeDataTable(tableId) {
      $(tableId).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthChange: true,
      });
    },
  },
  created() {
    this.fetchTotalLoggedInUsers();
    this.fetchTotalNotLoggedInUsers();
    this.fetchUsersNotLoggedInToday();
    this.fetchUsers();
  }
};
</script>