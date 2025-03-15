<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>LISTING DES TAXATIONS</h6>
    </div>
    <div v-if="loading" class="loading">
      <p>Chargement de données...</p>
    </div>
    <div v-if="error" class="error">
      <p>Erreur connexion base de données: {{ error }}</p>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <table id="taxationTable" class="display table align-items-center mb-0 table-striped">
        <thead>
          <tr class="text-uppercase text-secondary font-weight-bolder opacity-7">
            <th>DATE TAXATION</th>
            <th>TYPE DE VEHICULE</th>
            <th>MONTANT TAXATION</th>
            <th>PLAQUE IMMATRICULATION</th>
            <th>POSTE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dashboardData" :key="item.verbalisation_id">
            <td style="text-align: center;">{{ item.date_heure_verba }}</td>
            <td style="text-align: center;">{{ item.vehicule_designation }}</td>
            <td style="text-align: center;"><b>{{ item.verba_montant }} Fc</b></td>
            <td style="text-align: center;">{{ item.plaque_immatriculation }}</td>
            <td style="text-align: center;">{{ item.verba_user_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* global $ */
import axios from 'axios';

export default {
  data() {
    return {
      dashboardData: [],
      loading: true,
      error: null,
      dataTable: null // Keep reference to DataTable instance
    };
  },
  created() {
    this.fetchDashboardData();
    setInterval(this.fetchDashboardData, 120000); // Refresh every 2 minutes
  },
  mounted() {
    this.initializeDataTable(); // Initialize DataTable once
  },
  methods: {
    fetchDashboardData() {
      this.loading = true; // Set loading state
      axios
        .get('https://ultima.ultimardc.com/index.php/api/get_all_moto')
        .then((response) => {
          this.dashboardData = response.data;
          this.loading = false;
          this.updateDataTable(); // Update DataTable with new data
        })
        .catch((error) => {
          this.error = error.response ? error.response.data.message : error.message;
          console.error("Error fetching data:", this.error);
          this.loading = false;
        });
    },
    initializeDataTable() {
      this.dataTable = $('#taxationTable').DataTable({
        destroy: true,
        paging: true,
        searching: true,
        ordering: true,
        dom: 'Bfrtip',
        buttons: [
          { extend: 'excelHtml5', title: 'Liste des Taxations', className: 'btn btn-success' },
          { extend: 'pdfHtml5', title: 'Liste des Taxations', className: 'btn btn-danger' }
        ],
        columnDefs: [
          {
            targets: 1,
            render: function(data) { return '<b>' + data + '</b>'; }
          },
          {
            targets: 3,
            render: function(data) { return '<span class="badge badge-primary">' + data + '</span>'; }
          }
        ]
      });
    },
    updateDataTable() {
      this.dataTable.clear(); // Clear existing data
      this.dashboardData.forEach(item => {
        this.dataTable.row.add([
          item.date_heure_verba,
          item.vehicule_designation,
          item.verba_montant + ' Fc',
          item.plaque_immatriculation,
          item.verba_user_id
        ]);
      });
      this.dataTable.draw(); // Draw the table with updated data
    }
  }
};
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>
