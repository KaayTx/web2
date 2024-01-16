const ManagePage = async () => {
    const main = document.querySelector('main');
    main.innerHTML = await renderpage();
  };
  
  async function renderpage() {
  
      const queries = await onaddquery(); 
      const statuses = ["requested", "accepted", "refused", "done"];
  
      let infos = ` 
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h1>Manage Queries</h1>
              <p>Manage your queries here</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <ul id="queryList">
              `;
  
      queries.forEach(query => {
        infos += `
          <li>
            <strong>Subject:</strong> ${query.subject}<br>
            <strong>Status:</strong> 
            <select>
            `;
        
        statuses.forEach(status => {
          infos += `<option value="${status}" ${query.status === status ? 'selected' : ''}>${status}</option>`;
        });
  
        infos += `
            </select>
          </li>
        `;
      });
  
      infos += `
            </div>
          </div>
        </div>
      `;
      
      return infos;
    } 
  
  async function onaddquery() {
    const response = await fetch('http://localhost:3000/queries');
    if (!response.ok) {
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    const data = await response.json();
    console.log('New query added : ', data);
    return data;
  }
  
  export default ManagePage;