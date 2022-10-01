
//////register api////


// post login form using fetch API
const signupForm = document.getElementById('signUp')

signupForm.addEventListener('submit', async function (evt) {
    evt.preventDefault(); // to prevent the custom form property of reloading on submission.

    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const phone = document.getElementById('phone').value;
    const sex = document.getElementById('sex').value;
    const age = document.getElementById('age').value;
    const skill = document.getElementById('skills').value;
    const skillLevel = document.getElementById('skLevel').value; 
    const country = document.getElementById('country').value; 
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   

    await fetch('/api/register',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fname: fname,
            lname: lname,
            phone: phone,
            sex: sex,
            age: age,
            country: country,
            skills :skill,
            level :skillLevel,
            state : state,
            email: email,
            password : password,
        })
    })
        .then(res => res.json())
        .then(data => {
            const message = data.message;
            const token = data.token;
            const error = data.error;
            if (message) {
                swal({
                    icon: "error",
                    text: message ,
                    button: false,
                })
            } else if (error) {
                swal({
                    icon: "error",
                    text: error,
                    button: false,
                })
            }
            else {
                localStorage.setItem('token',token)
                swal({
                    icon: "success",
                    text: "Sign-Up successful",
                    button: false,
                })
                setTimeout(() => { location.assign('/'); }, 1700);
                // setTimeout(() => { location.assign('/index'); }, 1000);
            }
        })

})

