// Get references to elements
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var educationContainer = document.getElementById('education-container');
var profileImageInput = document.getElementById('profile-image');
var addEducationBtn = document.getElementById('add-education-btn');
var imageURL = '';
// Function to update the resume display
var updateResumeDisplay = function () {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skills = document.getElementById('skills').value;
    var hobbies = document.getElementById('hobbies').value;
    var experience = document.getElementById('experience').value;
    var careerObjective = document.getElementById('career-objective').value;
    // Generate the education details
    var educationDetails = [];
    educationContainer.querySelectorAll('.education-entry').forEach(function (entry) {
        var degree = entry.querySelector('.degree-input').value;
        var startYear = entry.querySelector('.start-year-input').value;
        var endYear = entry.querySelector('.end-year-input').value;
        if (degree && startYear && endYear) {
            educationDetails.push("".concat(degree, " (").concat(startYear, " - ").concat(endYear, ")"));
        }
    });
    // Render the resume
    resumeDisplayElement.innerHTML = "\n        <div id=\"resume-box\">\n            <div id=\"left-section\">\n                <div class=\"profile-image\">\n                    <img src=\"".concat(imageURL || 'default-profile.png', "\" alt=\"Profile Image\">\n                </div>\n                <div class=\"contact\">\n                    <h3>Contact</h3>\n                    <p><b>Email:</b> ").concat(email, "</p>\n                    <p><b>Phone:</b> ").concat(phone, "</p>\n                </div>\n                <div class=\"skill\">\n                    <h3>Skills</h3>\n                    <ul>").concat(skills.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n                </div>\n                <div class=\"hobby\">\n                    <h3>Hobbies</h3>\n                    <ul>").concat(hobbies.split(',').map(function (hobby) { return "<li>".concat(hobby.trim(), "</li>"); }).join(''), "</ul>\n                </div>\n            </div>\n            <div id=\"right-section\">\n                <div class=\"name\"><h1>").concat(name, "</h1></div>\n                <div class=\"education\">\n                    <h3>Education</h3>\n                    <ul>").concat(educationDetails.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n                </div>\n                <div class=\"experience\">\n                    <h3>Work Experience</h3>\n                    <p>").concat(experience, "</p>\n                </div>\n                <div class=\"career-objective\">\n                    <h3>Career Objective</h3>\n                    <p>").concat(careerObjective, "</p>\n                </div>\n            </div>\n        </div>\n    ");
};
// Handle profile image upload
profileImageInput.addEventListener('change', function () {
    if (profileImageInput.files && profileImageInput.files[0]) {
        var file = profileImageInput.files[0];
        imageURL = URL.createObjectURL(file);
        updateResumeDisplay();
    }
});
// Add education entry
addEducationBtn.addEventListener('click', function () {
    var educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');
    var degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.placeholder = 'Degree (e.g., Bachelor\'s)';
    degreeInput.className = 'degree-input';
    var startYearInput = document.createElement('input');
    startYearInput.type = 'number';
    startYearInput.placeholder = 'Start Year';
    startYearInput.className = 'start-year-input';
    var endYearInput = document.createElement('input');
    endYearInput.type = 'number';
    endYearInput.placeholder = 'End Year';
    endYearInput.className = 'end-year-input';
    educationEntry.append(degreeInput, startYearInput, endYearInput);
    educationContainer.appendChild(educationEntry);
    // Update resume display when any education field changes
    [degreeInput, startYearInput, endYearInput].forEach(function (input) {
        input.addEventListener('input', updateResumeDisplay);
    });
});
// Update resume in real-time on input change
form.addEventListener('input', updateResumeDisplay);
form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Resume updated!');
});
