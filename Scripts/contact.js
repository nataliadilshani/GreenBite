// Contact Form
const form=document.getElementById("contactForm");
const msg=document.getElementById("form-msg");

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  let name=document.getElementById("name").value.trim();
  let email=document.getElementById("email").value.trim();
  let message=document.getElementById("message").value.trim();

  if(name===""||email===""||message===""){
    msg.textContent="Please fill in all fields.";
    msg.style.color="red";
    return;
  }

  let feedback={name,email,message,date:new Date().toLocaleString()};
  let stored=JSON.parse(localStorage.getItem("feedbacks"))||[];
  stored.push(feedback);
  localStorage.setItem("feedbacks",JSON.stringify(stored));

  msg.textContent="Thank you for your feedback!";
  msg.style.color="green";
  form.reset();
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(btn=>{
  btn.addEventListener("click",()=>{
    let answer=btn.nextElementSibling;
    answer.style.display=answer.style.display==="block"?"none":"block";
  });
});
