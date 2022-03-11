let quizOption = document.querySelectorAll(`input`);
const btn = document.querySelector("button");
const overlay = document.querySelector("#overlay");
const congrat_overlay = document.querySelector("#alert");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let student_answer = [];
  const actual_answer = [
    document.getElementById("q1-3"),
    document.getElementById("q2-1"),
    document.getElementById("q3-3"),
  ];
  quizOption.forEach((option) => {
    const option_checked = document.getElementById(option.id);
    if (option_checked.checked) {
      student_answer.push(option_checked);
    }
  });

  const isTrue = student_answer.every((answer) => {
    return actual_answer.includes(answer);
  });

  student_answer.forEach((answer) => {
    if (actual_answer.includes(answer)) {
      const element = document.getElementById(answer.id);
      element.parentElement.classList.add("true");
    } else {
      const element = document.getElementById(answer.id);
      element.parentElement.classList.add("wrong");
    }
  });

  if (isTrue) {
    overlay.classList.add("open");
    congrat_overlay.classList.add("open");
  }
});
