# NoteTaking Project
## Overview
This project is a simple dashboard application with functionality for managing notes. Users can view their profile information, take notes, and manage their notes by archiving or deleting them. The dashboard is built with HTML, CSS, and JavaScript, and uses localStorage to persist notes data.

## Features
User Info Section: Displays user information.
Taking Notes Section: Allows users to create new notes with titles, bodies, and priorities. Notes are saved to localStorage.
Archived Notes Section: Displays notes that have been archived.
Deleted Notes Section: Displays notes that have been deleted.
Filtering: Users can filter saved notes by priority.
Logout: A button is provided to log out and redirect to the login page.

## File Structure
index.html: The main HTML file for the dashboard.
styles.css: The CSS file for styling the dashboard.
dashboard.js: The JavaScript file containing the logic for the dashboard functionality.

## Setup
1. Clone the Repository

~~~bash
git clone <repository-url>
cd <repository-folder>
~~~
2. Open index.html

Open index.html in your preferred web browser to view the dashboard.

## Usage
- Navigating Sections: Use the sidebar links to navigate between different sections of the dashboard.
- Taking Notes: Click on the "Take Notes" button to open a popup where you can enter note details and save them.
- Filtering Notes: Use the priority filter dropdown in the "Taking Notes" section to filter notes based on their priority.
- Managing Notes: Archive or delete notes using the buttons provided in each note’s details.
- Restoring Notes: Restore notes from the "Archived Notes" or "Deleted Notes" sections back to the "Saved Notes" list.

## Code Explanation
- HTML (index.html): Contains the structure of the dashboard, including sections for user info, taking notes, archived notes, and deleted notes.
- CSS (styles.css): Provides styling for the dashboard layout and components.
- JavaScript (dashboard.js): Manages dynamic interactions such as showing sections, handling note operations (create, save, archive, delete, restore), and filtering notes.

## Dependencies
- No external libraries or frameworks are used. This project relies solely on native HTML, CSS, and JavaScript.
Contribution
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or feedback, please contact [yebo7in@gmail.com].
