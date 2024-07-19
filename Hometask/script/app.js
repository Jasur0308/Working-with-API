document.addEventListener('DOMContentLoaded', () => {
    const $response = document.getElementById("response");

    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            if (data.users && Array.isArray(data.users)) {
                renderUsers(data.users);
            } else {
                console.error("Unexpected data format:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });

    const renderUsers = (users) => {
        users.forEach(user => {
            const $div = document.createElement("div");
            $div.className = "user__card";
            $div.innerHTML = `
                <p><strong>Id</strong>: ${user.id}</p>
                <p><strong>First Name</strong>: ${user.firstName}</p>
                <p><strong>Last Name</strong>: ${user.lastName}</p>
                <p><strong>Maiden Name</strong>: ${user.maidenName}</p>
                <p><strong>Age</strong>: ${user.age}</p>
                <p><strong>Gender</strong>: ${user.gender}</p>
                <p><strong>Email</strong>: ${user.email}</p>
                <p><strong>Phone</strong>: ${user.phone}</p>
                <p><strong>Username</strong>: ${user.username}</p>
                <p><strong>Password</strong>: ${user.password}</p>
                <p><strong>Birth Date</strong>: ${user.birthDate}</p>
                <img src="${user.image}" alt="User Image">
                <p><strong>Blood Group</strong>: ${user.bloodGroup}</p>
                <p><strong>Height</strong>: ${user.height}</p>
                <p><strong>Weight</strong>: ${user.weight}</p>
                <p><strong>Eye Color</strong>: ${user.eyeColor}</p>
                <p><strong>Hair</strong>: {
                    Color: ${user.hair.color},
                    Type: ${user.hair.type}
                }</p>
                <p><strong>IP</strong>: ${user.ip}</p>
                <p><strong>Address</strong>: {
                    Address: ${user.address.address},
                    City: ${user.address.city},
                    State: ${user.address.state},
                    State Code: ${user.address.stateCode},
                    Postal Code: ${user.address.postalCode},
                    Coordinates: {
                        Latitude: ${user.address.coordinates.lat},
                        Longitude: ${user.address.coordinates.lng}
                    },
                    Country: ${user.address.country}
                }</p>
                <p><strong>macAddress</strong>: ${user.macAddress}</p>
                <p><strong>University</strong>: ${user.university}</p>
                <p><strong>Bank</strong>: {
                    Card Expire: ${user.bank.cardExpire},
                    Card Number: ${user.bank.cardNumber},
                    Card Type: ${user.bank.cardType},
                    Currency: ${user.bank.currency},
                    IBAN: ${user.bank.iban}
                }</p>
                <p><strong>Company</strong>: {
                    Department: ${user.company.department},
                    Name: ${user.company.name},
                    Title: ${user.company.title},
                    Address: {
                        Address: ${user.company.address.address},
                        City: ${user.company.address.city},
                        State: ${user.company.address.state},
                        State Code: ${user.company.address.stateCode},
                        Postal Code: ${user.company.address.postalCode},
                        Coordinates: {
                            Latitude: ${user.company.address.coordinates.lat},
                            Longitude: ${user.company.address.coordinates.lng}
                        },
                        Country: ${user.company.address.country}
                    }
                }</p>
                <p><strong>EIN</strong>: ${user.ein}</p>
                <p><strong>SSN</strong>: ${user.ssn}</p>
                <p><strong>User Agent</strong>: ${user.userAgent}</p>
                <p><strong>Crypto</strong>: {
                    Coin: ${user.crypto.coin},
                    Wallet: ${user.crypto.wallet},
                    Network: ${user.crypto.network}
                }</p>
                <p><strong>Role</strong>: ${user.role}</p>
                <button data-user-id="${user.id}" class="delete">DELETE</button>
            `;
            $response.appendChild($div);
        });
    }

    const handleUserActions = (e) => {
        if (e.target.classList.contains("delete")) {
            const id = e.target.dataset.userId;
            const userAgree = confirm("Are you sure!?");
            if (userAgree) {
                
                const user = Array.from($response.children).find(div => div.querySelector(`button[data-user-id="${id}"]`));
                console.log("Deleted user data:", user.innerHTML); // Log the deleted user data
                
                fetch(`https://dummyjson.com/users/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(() => {
                    fetch('https://dummyjson.com/users')
                        .then(response => response.json())
                        .then(data => renderUsers(data.users))
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                });
            }
        }
    }

    $response.addEventListener("click", handleUserActions);
});