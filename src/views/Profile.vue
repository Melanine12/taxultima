
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12"></div>
        <div class="card">
          <div class="card-header pb-0">
            <h6>REPORTING JOUR APRÈS JOUR</h6>
          </div>
          <div v-if="loading" class="loading">
            <p>Chargement de données...</p>
          </div>
          <div v-if="error" class="error">
            <p>Erreur connexion base de données: {{ error }}</p>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>Start Date:</label>
              <input type="date" v-model="startDate" @change="fetchData" />
            </div>
            <div class="col-md-6">
              <label>End Date:</label>
              <input type="date" v-model="endDate" @change="fetchData" />
            </div>
          </div>

          <br />
          <div class="card-body px-0 pt-0 pb-2">
            <table id="dailyTotalsTable" class="display">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Vente</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in dailyTotals" :key="row.date_verbalisation">
                  <td>{{ formatDate(row.date_verbalisation) }}</td>
                  
                  <td>
                    <span class="badge badge-primary">{{ formatCurrency(row.total_vente) }}</span>
                  </td>
                  
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th id="totalVenteFooter"><b>{{ formatCurrency(totalVente) }}</b></th>
                  
                </tr>
              </tfoot>
            </table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import axios from 'axios';
//import ArgonBadge  from "@/components/ArgonBadge.vue";

export default {
  name: "VerbalisationTable",
  
  
  data() {
    return {
      loading: false,
      error: null,
      dailyTotals: [],
      startDate: '',
      endDate: '',
      dataTable: null,
      totalVente: 0,
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('fr-CD', { style: 'currency', currency: 'CDF' }).format(value);
    },
    formatDate(dateString) {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Date invalide";
  }

  // Get the full weekday name in French
  const dayOptions = { weekday: 'long' };
  const dayName = new Intl.DateTimeFormat('fr-FR', dayOptions).format(date);

  // Format the date as "dd-MM-yyyy" (day-month-year)
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(date);

  // Combine the day name and date in the desired format
  return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}, le ${formattedDate}`;
},
    fetchData() {
      const apiUrl = "https://ultima.ultimardc.com/index.php/api/daily-totals";
      this.loading = true;
      this.error = null;

      axios
        .get(apiUrl, {
          params: {
            start_date: this.startDate,
            end_date: this.endDate,
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.dailyTotals = response.data.data;
            this.calculateTotalVente();
            this.initDataTable();
          } else {
            this.error = "No data found within selected dates.";
          }
        })
        .catch((error) => {
          this.error = "Error loading data";
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    calculateTotalVente() {
      this.totalVente = this.dailyTotals.reduce((sum, row) => {
        return sum + (parseFloat(row.total_vente) || 0);
      }, 0);
    },
    initDataTable() {
      if ($.fn.DataTable.isDataTable('#dailyTotalsTable')) {
        $('#dailyTotalsTable').DataTable().clear().destroy();
      }

      this.$nextTick(() => {
        this.dataTable = $('#dailyTotalsTable').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy',
            'csv',
            'excel',
            'pdf',
            'print'
          ],
          paging: true,
          searching: true,
          ordering: true,
          data: this.dailyTotals,
          columns: [
            { data: 'date_verbalisation',
              
            },
            {
              data: 'total_vente',
              render: (data) => `<span class="badge badge-danger style="font-size: 2.25em;">${this.formatCurrency(data)}</span>`,
            }
          ],
        });
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.loading {
  font-size: 1.5em;
  text-align: center;
  margin: 20px 0;
}
.error {
  color: red;
  text-align: center;
  margin: 20px 0;
}

.badge-large {
  font-size: 1.25em; /* Adjust the size as needed */
  padding: 0.5em 0.75em; /* Keep your padding consistent */
}
</style>
