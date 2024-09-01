function memberdefine(scriptrl){
         var team = document.getElementById("team");
         team.innerHTML = '<div class="loading"></div>';
        fetch(scriptrl)
        .then(response => response.json())
        .then(data => {
            var team = document.getElementById("team");
            const sortedData = data.sort((a, b) => {
                const roleOrder = ['Convenor','Chairperson','Vice-Chairperson','General Secretary','Treasurer','WebMaster','Head', 'Vice-Head', 'Executive'];
                return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
            });

            
            let html = ''; // Initialize an empty string to build the HTML
            let headHtml = ''; // Initialize an empty string to build the Head HTML
            let executiveHtml = ''; // Initialize an empty string to build the Executive HTML
            let ieeeHtml = '';
            let wieHtml = '';

            let ieeeHeadHtml = ''; // Initialize an empty string to build the Head HTML for IEEE
            let ieeeExecutiveHtml = ''; // Initialize an empty string to build the Executive HTML for IEEE
            let wieHeadHtml = ''; // Initialize an empty string to build the Head HTML for WIE
            let wieExecutiveHtml = ''; // Initialize an empty string to build the Executive HTML for WIE

            sortedData.forEach(item => {
                if (Object.values(item).some(value => value !== "" && value !== null)) {
                    const cardHtml = `
                    <div class="card">
                        <img src="${item.image}">
                        <h3>${item.name}</h3>
                        <p>${item.role}</p>
                        <a class="fa fa-linkedin-square" href="${item.linkedin}"></a>
                    </div>`
                    if(item.committee === "IEEE"){
                        if (item.role === 'Head' || item.role === 'Vice-Head' || item.role === 'Chairperson' || item.role === 'Vice-Chairperson' || item.role === 'Convenor') {
                            ieeeHeadHtml += cardHtml; // Append the HTML string to the ieeeHeadHtml variable
                        } else if (item.role === 'Executive' || item.role === 'General Secretary' || item.role === 'Treasurer' || item.role === 'WebMaster') {
                            ieeeExecutiveHtml += cardHtml; // Append the HTML string to the ieeeExecutiveHtml variable
                        }
                    }
                    else if(item.committee === "WIE"){
                        if (item.role === 'Head' || item.role === 'Vice-Head' || item.role === 'Chairperson' || item.role === 'Vice-Chairperson' || item.role === 'Convenor') {
                            wieHeadHtml += cardHtml; // Append the HTML string to the wieHeadHtml variable
                        } else if (item.role === 'Executive' || item.role === 'General Secretary' || item.role === 'Treasurer' || item.role === 'WebMaster') {
                            wieExecutiveHtml += cardHtml; // Append the HTML string to the wieExecutiveHtml variable
                        }
                    }
                    
                }
            });

            if (ieeeHeadHtml !== '' || ieeeExecutiveHtml !== '') { // Check if there is at least one IEEE committee member
                ieeeHtml += '<h3>IEEE</h3></br>';
                ieeeHtml += '<div class="flexbox">' + ieeeHeadHtml + '</div>';
                ieeeHtml += '<div class="flexbox">' + ieeeExecutiveHtml + '</div>';
                html += ieeeHtml;
            }

            if (wieHeadHtml !== '' || wieExecutiveHtml !== '') { // Check if there is at least one WIE committee member
                wieHtml += '<h3>WIE</h3></br>';
                wieHtml += '<div class="flexbox">' + wieHeadHtml + '</div>';
                wieHtml += '<div class="flexbox">' + wieExecutiveHtml + '</div>';
                html += wieHtml;
            }

            team.innerHTML = html;
            });
        }
