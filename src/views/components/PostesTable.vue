<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>LISTING DES POSTES ET SITUATIONS DE VENTES HEBDOMADAIRES</h6>
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
        <input type="date" v-model="startDate" />
      </div>
      <div class="col-md-6">
        <label>End Date:</label>
        <input type="date" v-model="endDate" />
      </div>
    </div>
     
    <br />
    <div class="card-body px-0 pt-0 pb-2">
      <table id="verbalisationTable" class="display table align-items-center mb-0 table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Agent ID</th>
            <th>AFFECTATION</th>
            <th>POSTE</th>
            <th>CUMUL VENTE en FC</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th colspan="4" style="text-align: right;">Total:</th>
            <th id="totalVerbaMontant">0 FC</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: "VerbalisationTable",
  data() {
    return {
      loading: true,
      error: null,
      dataTable: null,
      startDate: '',
      endDate: '',
    };
  },
  watch: {
    startDate() {
      this.initializeDataTable(); // Reinitialize DataTable when startDate changes
    },
    endDate() {
      this.initializeDataTable(); // Reinitialize DataTable when endDate changes
    }
  },
  mounted() {
    this.initializeDataTable();
  },
  beforeUnmount() {
    if (this.dataTable) {
      this.dataTable.destroy(); // Destroy existing instance before unmounting
    }
  },
  methods: {
    initializeDataTable() {
      const apiUrl = "https://taxefy.ggsdrc.com/index.php/api/getdatafilter";
      
      // Destroy any existing DataTable instance
      if ($.fn.DataTable.isDataTable('#verbalisationTable')) {
        $('#verbalisationTable').DataTable().clear().destroy();
      }
      
      this.dataTable = $('#verbalisationTable').DataTable({
        processing: true,
        serverSide: false,
        stateSave: true,
        ajax: {
          url: apiUrl,
          data: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
          dataSrc: (json) => {
            this.loading = false;
            if (json.status === "success") {
              this.calculateTotalVerbaMontant(json.data);
              return json.data;
            } else {
              this.error = "Failed to load data";
              return [];
            }
          },
          error: (xhr, error) => {
            this.error = "Error loading data";
            this.loading = false;
            console.error("Error loading data:", error);
          }
        },
        columns: [
          {
            className: 'details-control',
            orderable: false,
            data: null,
            defaultContent: '<button>Details</button>',
          },
          { data: "verba_user_id" },
          { data: "nom_agent" },
          { data: "post_nom" },
          {
            data: "total_verba_montant",
            render: (data) => `${data} FC`,
          }
        ],
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
      });

      // Add event listener for row details
      $('#verbalisationTable tbody').on('click', 'button', (event) => {
        const tr = $(event.currentTarget).closest('tr');
        const row = this.dataTable.row(tr);

        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(this.formatDetails(row.data())).show();
          tr.addClass('shown');
        }
      });
    },

    calculateTotalVerbaMontant(data) {
      const totalVerbaMontant = data.reduce((sum, row) => {
        const amount = parseFloat(row.total_verba_montant) || 0; 
        return sum + amount; 
      }, 0);
      $('#totalVerbaMontant').text(`${totalVerbaMontant} FC`);
    },

    formatDetails(rowData) {
      return `
        <table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
          <tr>
            <td><strong>Total Moto:</strong></td>
            <td>${rowData.total_moto}</td>
          </tr>
          <tr>
            <td><strong>Total Taxi:</strong></td>
            <td>${rowData.total_taxi}</td>
          </tr>
          <tr>
            <td><strong>Total Bus:</strong></td>
            <td>${rowData.total_bus}</td>
          </tr>
          <tr>
            <td><strong>Total Verba Montant:</strong></td>
            <td>${rowData.total_verba_montant} FC</td>
          </tr>
        </table>`;
    }
  }
};
</script>

<style scoped>
@import "https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css";
@import "https://cdn.datatables.net/buttons/2.2.3/css/buttons.dataTables.min.css";

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
</style>
