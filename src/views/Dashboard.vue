<style>
canvas {
  max-width: 400px;
  max-height: 400px;
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
</style>
<script setup>
//import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
//import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
//import Carousel from "./components/Carousel.vue";
//import CategoriesList from "./components/CategoriesList.vue";

//import US from "@/assets/img/icons/flags/US.png";
//import DE from "@/assets/img/icons/flags/DE.png";
//import GB from "@/assets/img/icons/flags/GB.png";
//import BR from "@/assets/img/icons/flags/BR.png";

/* const sales = {
  us: {
    country: "United States",
    sales: 2500,
    value: "$230,900",
    bounce: "29.9%",
    flag: US,
  },
  germany: {
    country: "Germany",
    sales: "3.900",
    value: "$440,000",
    bounce: "40.22%",
    flag: DE,
  },
  britain: {
    country: "Great Britain",
    sales: "1.400",
    value: "$190,700",
    bounce: "23.44%",
    flag: GB,
  },
  brasil: {
    country: "Brasil",
    sales: "562",
    value: "$143,960",
    bounce: "32.14%",
    flag: BR,
  },
}; */
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa fa-motorcycle"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">TOTAL JOURNALIER TICKET MOTO</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                              {{ totalMotosjournalier }}
                            </h2>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
           
           
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-bus"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">TOTAL JOURNALIER TICKET BUS</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                              {{ totalBusesjournalier }}
                            </h2>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-car"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">TOTAL JOURNALIER TICKET TAXI</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                              {{ totaltaxijournalier }}
                            </h2>
                        </div>
                       
                    </div>
                   
                </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <div class="card l-bg-grey">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">VENTES JOURNALIÈRES</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h4 class="d-flex align-items-center mb-0">
                              {{ formatCurrency(totalVerbaMontantjournalier) }} 
                            </h4>
                        </div>
                       
                    </div>
                    
                </div>
            </div>
            
           
          </div>
        </div>
        
        <br />
        <div class="row">
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="row">
              <div class="card l-bg-grey">
                  <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                      <div class="mb-4">
                          <h5 class="card-title mb-0">CUMUL DES VENTES</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                          <div class="col-8">
                              <h4 class="d-flex align-items-center mb-0">
                                {{ formatCurrency(totalVerbaMontant) }} FC
                              </h4>
                          </div>
                        
                      </div>
                      
                  </div>
              </div>
            </div>
            <div class="row">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2">Top 5 de meilleurs Postes</h6>
                  </div>
                </div>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Poste</th>
                        <th>Total Taxés en FC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(seller, index) in topSellers" :key="index">
                        <td>{{ seller.post_nom }}</td>
                        <td><ArgonBadge>{{ seller.total_verba_montant }} Fc</ArgonBadge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
          </div>
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Statistiques Ventes de Tickets par Type de vehicule</h6>
                </div>
              </div>
              <canvas id="vehicleChart"></canvas>
            </div>
          </div>
        </div> 
        <br />
      
       
       
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ArgonBadge  from "@/components/ArgonBadge.vue";
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      totalMotos: 0,
      totalBuses: 0,
      totaltaxi: 0,
      totalVerbaMontant: 0, // Add this line to store the total verba montant
      cumulVerbaMontant: 0, // Add this line to store the cumul verba montant
      totalMotosjournalier: 0,
      totalBusesjournalier: 0,
      totaltaxijournalier: 0,
      totalVerbaMontantjournalier: 0,
      topSellers: [],
      vehicleCounts: {
        total_moto: 0,
        total_taxi: 0,
        total_bus: 0,
      },
      chart: null, // Reference to the chart instance
    };
  },
  created() {
    this.fetchTotalMotos();
    this.fetchTotalBuses();
    this.fetchTotalTaxi();
    this.fetchTotalVerbaMontant(); // Call this method to fetch the total verba montant
    this.fetchTotalMotosjournalier();
    this.fetchTotalBusesjournalier();
    this.fetchTotalTaxijournalier();
    this.fetchTotalVerbaMontantjournalier();
    this.fetchTopSellers();
  },
  methods: {
    async fetchTopSellers() {
      try {
        const response = await axios.get('https://ultima.ultimardc.com/index.php/api/classement_ventes');
        this.topSellers = response.data;
      } catch (error) {
        console.error('Error fetching top sellers:', error);
      }
    },
    fetchTotalMotos() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_moto')
        .then(response => response.json())
        .then(data => {
          console.log('Moto Data received:', data);
          this.totalMotos = data; // Update the moto count
        })
        .catch(error => {
          console.error('Error fetching motos:', error);
        });
    },
    fetchTotalMotosjournalier() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_moto_journalier')
        .then(response => response.json())
        .then(data => {
          console.log('Moto Data received:', data);
          this.totalMotosjournalier = data; // Update the moto count
        })
        .catch(error => {
          console.error('Error fetching motos:', error);
        });
    },
   
    fetchTotalBuses() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_bus')
        .then(response => response.json())
        .then(data => {
          console.log('Bus Data received:', data);
          this.totalBuses = data; // Update the bus count
        })
        .catch(error => {
          console.error('Error fetching buses:', error);
        });
    },
    fetchTotalBusesjournalier() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_bus_journalier')
        .then(response => response.json())
        .then(data => {
          console.log('Bus Data received:', data);
          this.totalBusesjournalier = data; // Update the bus count
        })
        .catch(error => {
          console.error('Error fetching buses:', error);
        });
    },
    
    fetchTotalTaxi() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_taxi')
        .then(response => response.json())
        .then(data => {
          console.log('Taxi Data received:', data);
          this.totaltaxi = data; // Update the taxi count
        })
        .catch(error => {
          console.error('Error fetching taxis:', error);
        });
    },
    fetchTotalTaxijournalier() {
      fetch('https://ultima.ultimardc.com/index.php/api/count_taxi_journalier')
        .then(response => response.json())
        .then(data => {
          console.log('Taxi Data received:', data);
          this.totaltaxijournalier = data; // Update the taxi count
        })
        .catch(error => {
          console.error('Error fetching taxis:', error);
        });
    },

    fetchTotalVerbaMontant() { // New method to fetch total verba montant
      fetch('https://ultima.ultimardc.com/index.php/api/total_verba_montant') // Adjust the URL based on your CodeIgniter setup
        .then(response => response.json())
        .then(data => {
          console.log('Total Verba Montant received:', data);
          this.totalVerbaMontant = data; // Assuming the total is a numeric value
        })
        .catch(error => {
          console.error('Error fetching total verba montant:', error);
        });
    },
    formatNumber(value) {
      return value.toLocaleString('fr-FR') + ' FC'; // Adjust to your preferred locale
    },

    fetchTotalVerbaMontantjournalier() { // New method to fetch total verba montant
      fetch('https://ultima.ultimardc.com/index.php/api/total_verba_montant_journalier') // Adjust the URL based on your CodeIgniter setup
        .then(response => response.json())
        .then(data => {
          console.log('Total Verba Montant received:', data);
          this.totalVerbaMontantjournalier = data; // Assuming the total is a numeric value
        })
        .catch(error => {
          console.error('Error fetching total verba montant:', error);
        });
    },
    formatCurrency(value) {
      // Check if the value is null or undefined
      if (value == null) {
        return '0 FC'; // or return an empty string or whatever default you prefer
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ;
    },
    formatNumber1(value) {
      return value.toLocaleString('fr-FR') ; // Adjust to your preferred locale
    },
    async fetchVehicleCounts() {
      try {
        // Replace this URL with the actual API endpoint
        const response = await axios.get('https://ultima.ultimardc.com/index.php/api/getVehicleCounts');
        this.vehicleCounts = response.data;
        this.renderChart();
      } catch (error) {
        console.error("Error fetching vehicle counts:", error);
      }
    },
    renderChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroy the previous chart instance if it exists
      }

      const ctx = document.getElementById('vehicleChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['MOTO', 'TAXI', 'BUS'],
          datasets: [{
            data: [
              this.vehicleCounts.total_moto,
              this.vehicleCounts.total_taxi,
              this.vehicleCounts.total_bus,
            ],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  
  },
  mounted() {
    this.fetchVehicleCounts();
  },
};
</script>

