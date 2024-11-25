// Get references to elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const educationContainer = document.getElementById('education-container') as HTMLDivElement;
const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;
const addEducationBtn = document.getElementById('add-education-btn') as HTMLButtonElement;

let imageURL = '';

// Function to update the resume display
const updateResumeDisplay = (): void => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const hobbies = (document.getElementById('hobbies') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const careerObjective = (document.getElementById('career-objective') as HTMLTextAreaElement).value;

    // Generate the education details
    const educationDetails: string[] = [];
    educationContainer.querySelectorAll('.education-entry').forEach(entry => {
        const degree = (entry.querySelector('.degree-input') as HTMLInputElement).value;
        const startYear = (entry.querySelector('.start-year-input') as HTMLInputElement).value;
        const endYear = (entry.querySelector('.end-year-input') as HTMLInputElement).value;
        if (degree && startYear && endYear) {
            educationDetails.push(`${degree} (${startYear} - ${endYear})`);
        }
    });

    // Render the resume
    resumeDisplayElement.innerHTML = `
        <div id="resume-box">
            <div id="left-section">
                <div class="profile-image">
                    <img src="${imageURL || 'default-profile.png'}" alt="Profile Image">
                </div>
                <div class="contact">
                    <h3>Contact</h3>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Phone:</b> ${phone}</p>
                </div>
                <div class="skill">
                    <h3>Skills</h3>
                    <ul>${skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
                </div>
                <div class="hobby">
                    <h3>Hobbies</h3>
                    <ul>${hobbies.split(',').map(hobby => `<li>${hobby.trim()}</li>`).join('')}</ul>
                </div>
            </div>
            <div id="right-section">
                <div class="name"><h1>${name}</h1></div>
                <div class="education">
                    <h3>Education</h3>
                    <ul>${educationDetails.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>
                <div class="experience">
                    <h3>Work Experience</h3>
                    <p>${experience}</p>
                </div>
                <div class="career-objective">
                    <h3>Career Objective</h3>
                    <p>${careerObjective}</p>
                </div>
            </div>
        </div>
    `;
};

// Handle profile image upload
profileImageInput.addEventListener('change', () => {
    if (profileImageInput.files && profileImageInput.files[0]) {
        const file = profileImageInput.files[0];
        imageURL = URL.createObjectURL(file);
        updateResumeDisplay();
    }
});

// Add education entry
addEducationBtn.addEventListener('click', () => {
    const educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');

    const degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.placeholder = 'Degree (e.g., Bachelor\'s)';
    degreeInput.className = 'degree-input';

    const startYearInput = document.createElement('input');
    startYearInput.type = 'number';
    startYearInput.placeholder = 'Start Year';
    startYearInput.className = 'start-year-input';

    const endYearInput = document.createElement('input');
    endYearInput.type = 'number';
    endYearInput.placeholder = 'End Year';
    endYearInput.className = 'end-year-input';

    educationEntry.append(degreeInput, startYearInput, endYearInput);
    educationContainer.appendChild(educationEntry);

    // Update resume display when any education field changes
    [degreeInput, startYearInput, endYearInput].forEach(input => {
        input.addEventListener('input', updateResumeDisplay);
    });
});

// Update resume in real-time on input change
form.addEventListener('input', updateResumeDisplay);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Resume updated!');
});
