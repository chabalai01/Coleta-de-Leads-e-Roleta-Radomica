// Add this at the top level of your script, outside any other event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sorteioBtn').addEventListener('click', function() {
        window.location.href = '.../pages/Sorteio.html';
    });
});

// Your existing form submit handler
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const lead = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpfCnpj: document.getElementById('cpfCnpj').value,
        vendedor: document.getElementById('vendedor').value,
        whatsapp: document.getElementById('whatsapp').value,
        observacao: document.getElementById('observacao').value,
        resultado: '',
        dataSorteio: ''
    };
    
    localStorage.setItem('currentLead', JSON.stringify(lead));
    
    let leads = JSON.parse(localStorage.getItem('leads')) || [];
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));
    
    this.reset();
    alert('Lead cadastrado com sucesso!');
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    // Get leads from localStorage
    const leads = JSON.parse(localStorage.getItem('leads')) || [];
    
    if (leads.length === 0) {
        alert('Não há leads para exportar!');
        return;
    }
    
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(leads);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    
    // Generate Excel file
    XLSX.writeFile(wb, "leads.xlsx");
});