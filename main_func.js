
/**
 *  This function is called whenever the page is loaded in order 
 *  to check if there are data to restore.
 */
window.onload = function() { 

	// 1. Load the locally stored data
	var reloaded = sessionStorage.getItem("reloaded");
	var current_obj_cells = sessionStorage.getItem("current_obj_cells");
	var current_cells = sessionStorage.getItem("current_cells");

	//NEW:
	var current_hw_types_per_cell = sessionStorage.getItem("current_hw_types_per_cell");

	//APPLICATION JSON Editor
	var current_obj = sessionStorage.getItem("current_obj");

	// 2. Check if the page is loaded after a refresh
	if (reloaded == "true") {
		
		// 3. Read the previously stored contents
		obj_cells = JSON.parse(current_obj_cells);
		cells = JSON.parse(current_cells);
		hw_types_per_cell = JSON.parse(current_hw_types_per_cell);

		// 4. Refresh the view
		if (cells.length != 0) {
			selected_cell = 1;                      
		}
		updateCellsTable();

		//APPLICATION JSON EDITOR
		// 3. Read the previously stored contents
		obj = JSON.parse(current_obj);

		// 4. Refresh the view
		updateApplicationTable();
		addTableRowHandler();

		//NEW:
		updateHwTypesTable();
	}
}

/**
 * This function is called before reloading the page in order
 * to store the previous work made by the user.
 */ 
window.onbeforeunload = function() {

	// 1. Define that a page refresh has been performed
	sessionStorage.setItem("reloaded", "true");

	// 2. Store the current work locally in the current session
	var current_obj_cells = JSON.stringify(obj_cells);
	var current_cells = JSON.stringify(cells);
	sessionStorage.setItem("current_obj_cells", current_obj_cells);
	sessionStorage.setItem("current_cells", current_cells);

	//NEW:
	var current_hw_types_per_cell = JSON.stringify(hw_types_per_cell);
	sessionStorage.setItem("current_hw_types_per_cell", current_hw_types_per_cell);

	//APPLICATION JSON EDITOR
	var current_obj = JSON.stringify(obj);
	sessionStorage.setItem("current_obj", current_obj);
}


// Initialize the global variables
// The JSON String that contains the default available hardware types
var hwTypesJson = '[ { "HW_type_Name":"CPU", "HW_type_ID": 1, "Number of Servers": 50000, "Number_of_Proc_Units_per_Server": 44, "Memory_per_Server": 128, "Storage_per_Server": 40, "Proc_Overcommitment_ratio": 1, "Memory_Overcommitment_ratio": 1, "Compute_Capability": 385063.4268, "Accelerators": 0, "Total_Number_of_Accelerators_per_Server": 0, "Accelerator_Compute_Capability": 0, "Type_of_CPU_model": 3, "CPU Idle Power Consumption": 0, "CPU Max Power Consumption": 0, "CPU_Number_of_Points_for_Interpolation": 11, "CPU Utilization Bins": [0,0.1,0.199,0.3,0.401,0.5,0.6,0.696,0.797,0.904,0.994], "CPU Power Consuption": [44.9,88.4,105,122,138,152,166,182,205,236,269], "CPU Sleep Power Consumption": 28, "Type of Accelerator Model": 0, "Accelerator Idle Power Consumption": 0, "Accelerator Max Power Consumption": 0, "Accelerator Sleep Power Consumption": 0 }, { "HW_type_Name":"CPU+GPU", "HW_type_ID": 2, "Number of Servers": 30000, "Number_of_Proc_Units_per_Server": 44, "Memory_per_Server": 128, "Storage_per_Server": 40, "Proc_Overcommitment_ratio": 1, "Memory_Overcommitment_ratio": 1, "Compute_Capability": 385063.4268, "Accelerators": 1, "Total_Number_of_Accelerators_per_Server": 4, "Accelerator_Compute_Capability": 1155190.28, "Type_of_CPU_model": 3, "CPU Idle Power Consumption": 0, "CPU Max Power Consumption": 0, "CPU_Number_of_Points_for_Interpolation": 11, "CPU Utilization Bins":[0,0.1,0.199,0.3,0.401,0.5,0.6,0.696,0.797,0.904,0.994], "CPU Power Consuption": [44.9,88.4,105,122,138,152,166,182,205,236,269], "CPU Sleep Power Consumption": 28, "Type of Accelerator Model": -1, "Accelerator Idle Power Consumption": 50, "Accelerator Max Power Consumption": 400, "Accelerator Sleep Power Consumption": 50 }, { "HW_type_Name":"CPU+DFE", "HW_type_ID": 3, "Number of Servers": 20000, "Number_of_Proc_Units_per_Server": 44, "Memory_per_Server": 128, "Storage_per_Server": 40, "Proc_Overcommitment_ratio": 1, "Memory_Overcommitment_ratio": 1, "Compute_Capability": 385063.4268, "Accelerators": 1, "Total_Number_of_Accelerators_per_Server": 4, "Accelerator_Compute_Capability": 1347721.994, "Type_of_CPU_model": 3, "CPU Idle Power Consumption": 0, "CPU Max Power Consumption": 0, "CPU_Number_of_Points_for_Interpolation": 11, "CPU Utilization Bins":[0,0.1,0.199,0.3,0.401,0.5,0.6,0.696,0.797,0.904,0.994], "CPU Power Consuption": [44.9,88.4,105,122,138,152,166,182,205,236,269], "CPU Sleep Power Consumption": 28, "Type of Accelerator Model": -1, "Accelerator Idle Power Consumption": 30, "Accelerator Max Power Consumption": 350, "Accelerator Sleep Power Consumption": 20 }, { "HW_type_Name":"CPU+MIC", "HW_type_ID": 4, "Number of Servers": 10000, "Number_of_Proc_Units_per_Server": 44, "Memory_per_Server": 128, "Storage_per_Server": 40, "Proc_Overcommitment_ratio": 1, "Memory_Overcommitment_ratio": 1, "Compute_Capability": 385063.4268, "Accelerators": 1, "Total_Number_of_Accelerators_per_Server": 4, "Accelerator_Compute_Capability": 2310380.561, "Type_of_CPU_model": 3, "CPU Idle Power Consumption": 0, "CPU Max Power Consumption": 0, "CPU_Number_of_Points_for_Interpolation": 11, "CPU Utilization Bins": [0,0.1,0.199,0.3,0.401,0.5,0.6,0.696,0.797,0.904,0.994], "CPU Power Consuption": [44.9,88.4,105,122,138,152,166,182,205,236,269], "CPU Sleep Power Consumption": 28, "Type of Accelerator Model": 1, "Accelerator Idle Power Consumption": 70, "Accelerator Max Power Consumption": 100, "Accelerator Sleep Power Consumption": 20 } ]';

var obj_cells = {"Maximum Simulation Time":0, "Update Interval":0, "Number of Cells":0, "Cells":[]};  
var hw_types = JSON.parse(hwTypesJson); // The list containing the available Hardware Types
var cells = [];
var selected_cell = 0;
var selected_hw = 1;
var hw_types_per_cell = [];

/**
 * This function is called when the Parse button is clicked, and
 * is responsible for parsing a given JSON string that contains 
 * the details of the Cells.
 */
function parseCellsJSON() {

	// 0. Initialization
	selected_cell = 1;

	// 1. Get the JSON string
	var jsonInput = document.getElementById("import-cell-field").value;

	if (jsonInput.includes('{') && jsonInput.includes('}')) {

		// 2. Parse the content of the JSON string
		obj_cells = JSON.parse(jsonInput);

		// 3. Update the tables
		updateCellsList();
		updateCellsTable();

		//NEW:
		updateHardwareTypeList();

	} else {
		alert("Please provide a valid json string before clicking the Parse button!");
	}     
}

/**
 * This function is called when the Import button is clicked, and
 * in responsile for importing a file that contains the deired JSON 
 * string.
 */
function importCellsJSONFile() {

	// 0. Initialization
	selected_cell = 1;

	// 1. Import the CellData to the desired object (i.e. obj_cells)
	loadCellsFileContent();

	// 2. Update the table with the Cells data
	updateCellsTable();

	//NEW:
	updateHwTypesTable();

}

/**
 * This function is responsible for parsing the content of the 
 * file that contains the desired JSON with the Cells data.
 */
function loadCellsFileContent(){

	  // 1. Get the name of the desired file and update the value of the Import field.
	  var fileToLoad = document.getElementById("fileToLoad-cell").files[0];
	  document.getElementById("import-cell-field").value = fileToLoad["name"];

	  // Create a new FileReader object.
	  var fileReader = new FileReader();

	  /**
	   * Define what the FileReader object should do, when the desired file is loaded.
	   */
	  fileReader.onload = function(fileLoadedEvent){

		  // 1. Load the String and print it to the console
		  var textFromFileLoaded = fileLoadedEvent.target.result;
		  console.log(textFromFileLoaded);

		  // 2. Parse the JSON string into a JavaScript object
		  obj_cells = JSON.parse(textFromFileLoaded);
		  console.log(obj_cells);

		  // 3. Update everything
		  updateCellsList();
		  updateCellsTable();

		  //NEW:
		  updateHardwareTypeList();
		  updateHwTypesTable();

		  // 4. Clear the list with the files (to allow re-importation of the same file)
		  document.getElementById('fileToLoad-cell').value = "";

	  };

	  // Read the content of the file
	  fileReader.readAsText(fileToLoad, "UTF-8");
}

function updateCellsList() {

	// 0. Copy the cells list
	cells = JSON.parse(JSON.stringify(obj_cells["Cells"]));

	// 1. For each cell replace the list of HW_Types with a list of their IDs
	for (var i = 0; i < cells.length; i++) {
		var hwt = cells[i]["HW_types"].slice(0);
		var selected_types = [];
		for (var j = 0; j < hwt.length; j++) {
			selected_types[j] = hwt[j]["HW_type_ID"];
		}
		cells[i]["HW_types"] = selected_types;
	}
}

/**
 * This function is responsible for updating the values of the 
 * hw_types_per_cell array.
 */
function updateHardwareTypeList() {

	// 0. Copy the cells list
	var cells_list = JSON.parse(JSON.stringify(obj_cells["Cells"]));

	// 1. For each cell 
	for (var i = 0; i < cells_list.length; i++) {

		// 1.1 Initialize the Available Hardware Types to the default values
		hw_types_per_cell[i] = JSON.parse(JSON.stringify(hw_types));

		// 1.2 Update their values based on each cell
		var temp_hw_types = JSON.parse(JSON.stringify(cells_list[i]["HW_types"]));
		for (var j = 0; j < temp_hw_types.length; j++) {

			// Get the ID of the Hardware Type
			var hw_id = temp_hw_types[j]["HW_type_ID"];

			// Update the equivalent entry
			hw_types_per_cell[i][hw_id - 1] = temp_hw_types[j];
		}
	}
	
	// 2. Update the names of the imported hardware types
	updateHwTypesNames();

}

/**
 * This function is responsible for updating the names of the imported
 * hardware types, in case they are not defined in the selected JSON.
 */
function updateHwTypesNames() {

	// 1. The names of the Hardware Types
	var names = ["CPU", "CPU+GPU", "CPU+DFE", "CPU+MIC"];

	// 2. Update the names
	for (var i = 0; i < hw_types_per_cell.length; i++) {
		for (var j = 0; j < hw_types_per_cell[i].length; j++) {
			hw_types_per_cell[i][j]["HW_type_Name"] = names[j];
		}
	}
}

/**
 * The functions below are responsible for iterating through the Cells 
 * and Hardware Types that the user created or imported.
 */
function previousHwType() {

	// 1. Decrement the selected_hw pointer by one
	selected_hw--;

	// 2. Check for saturation
	if (selected_hw < 1) {
		selected_hw = 1;
	}

	// 3. Update the table in order to display the details of the selected hw type
	updateHwTypesTable();
}

function nextHwType() {

	// 1. Increment the selected_hw pointer by one
	selected_hw++;

	// 2. Check for saturation
	if (selected_hw > hw_types.length) {
		selected_hw = hw_types.length;
	}

	// 3. Update the table in order to show the details of the selected hw type
	updateHwTypesTable();
}

function previousCell() {

	// 1. Decrement the selected_hw pointer by one
	selected_cell--;

	// 2. Check for saturation
	if (selected_cell < 1) {
		selected_cell = 1;
	}

	if (cells.length == 0) {
		selected_cell = 0;
	}

	// 3. Update the table in order to show the details of the selected hw type
	updateCellsTable();

	//NEW:
	selected_hw = 1;
	updateHwTypesTable();
}

function nextCell() {

	// 1. Increment the selected_hw pointer by one
	selected_cell++;

	// 2. Check for saturation
	if (selected_cell > cells.length) {
		selected_cell = cells.length;
	}

	if (cells.length == 0) {
		selected_cell = 0;
	}
	// 3. Update the table in order to show the details of the selected hw type
	updateCellsTable();

	//NEW:
	selected_hw = 1;
	updateHwTypesTable();
}

/**
 * This function is called when the Export button pressed, in order
 * to export the final list of cells as a JSON String.
 */
function exportCellDataJSON() {

	if (getGeneralFieldsAndValidate()){

		// 0. Define the overall values
		obj_cells["Number of Cells"] = obj_cells["Cells"].length;

		// 1. Add the info of each HW_Type to each cell
		mapHwTypesToCells();

		// 2. Convert the data into a JSON String
		obj_cells["Number of Cells"] = obj_cells["Cells"].length;
		var json = neatJSON(obj_cells, {'sort':false, 'wrap':40, 'aligned':true, 'around_colon':1 });

		// 3. Write the string to the desired textfield
		document.getElementById("export-cell-field").value = JSON.stringify(obj_cells);
		document.getElementById("export-cell-area").value = json;

		// 4. Turn the obj into its previous form
		updateCellsTable();
	}

}

/** 
 * This function is responsible for constructing the final JSON file
 * by adding the appropriate Hardware Type objects to the 
 * hardware types list of each Cell. In particular, it iterates 
 * through the cells array, and for each selected Hardware_Type_ID
 * it assigns the original Hardware Type object to the corresponding cell.
 */
function mapHwTypesToCells() {

	// 0. Update the cells list
	obj_cells["Cells"] = JSON.parse(JSON.stringify(cells));

	for (var i = 0; i < cells.length; i++) {

		var currentCell = cells[i];
		var hw_types_list = [];

		for (var j = 0; j < currentCell["HW_types"].length; j++) {
			hw_types_list[j] = hw_types_per_cell[i][parseInt(currentCell["HW_types"][j]) - 1];
		}

		// TODO: Keep the name of the HW Type in the exported file                 
		obj_cells["Cells"][i]["HW_types"] = hw_types_list;
	}
}

/**
 * This function is responsible for updating the content of the Hardware Types html table
 * with the details of the Hardware Type object that the "selected_hw" global variable
 * points to.         
 */
function updateHwTypesTable() {

	// 1. Clean the contents of the table
	var table = document.getElementById("hw-types-table");
	table.innerHTML = "";

	// 2. Get the selected Hardware Type
	selObj = hw_types_per_cell[selected_cell - 1][selected_hw - 1];

	var tr = document.createElement("tr");

	var t1 = document.createElement("td");
	var c1 = document.createTextNode(1)
	t1.appendChild(c1);

	var t2 = document.createElement("td");
	var c2 = document.createTextNode("HW_type_Name")
	t2.appendChild(c2);

	var t3 = document.createElement("td");
	var c3 = document.createTextNode(selObj["HW_type_Name"])
	t3.appendChild(c3);

	tr.appendChild(t1);
	tr.appendChild(t2);
	tr.appendChild(t3);

	table.appendChild(tr);
	// 3. Add one row for each key value found in the application object
	var i = 1; 
	for (key in selObj) {

		if (key == "HW_type_Name") continue;

		var tr = document.createElement("tr");

		var t1 = document.createElement("td");
		var c1 = document.createTextNode(i)
		t1.appendChild(c1);

		var t2 = document.createElement("td");
		var c2 = document.createTextNode(key)
		t2.appendChild(c2);

		var t3 = document.createElement("td");
		var c3 = document.createTextNode(selObj[key])
		t3.appendChild(c3);

		tr.appendChild(t1);
		tr.appendChild(t2);
		tr.appendChild(t3);

		table.appendChild(tr);

		i++;
	}
}

/**
 * This function is responsible for updating the content of the Cells html table
 * with the details of the Cell object that the "selected_cell" global variable
 * points to.         
 */
function updateCellsTable() {

	// 1. Clean the contents of the table
	var table = document.getElementById("cells-table");
	table.innerHTML = "";

	// 2. Get the selected Cell
	selObj = cells[selected_cell - 1];

	// 3. Add one row for each key value found in the application object
	var i = 1; 
	for (key in selObj) {

		var tr = document.createElement("tr");

		var t1 = document.createElement("td");
		var c1 = document.createTextNode(i)
		t1.appendChild(c1);

		var t2 = document.createElement("td");
		var c2 = document.createTextNode(key)
		t2.appendChild(c2);

		var t3 = document.createElement("td");
		var c3 = document.createTextNode(selObj[key])
		t3.appendChild(c3);

		tr.appendChild(t1);
		tr.appendChild(t2);
		tr.appendChild(t3);

		table.appendChild(tr);

		i++;
	}
}

/**
 * This function is responsible for displaying an empty New/Edit Cell
 * form.
 */
function newCellButtonPressed() {

	// 0. Show the Add button
	document.getElementById("cells-buttons").style.display = "none";
	document.getElementById("button-group-3-cell").style.display = "";
	document.getElementById("save-button-cell").style.display = "none";
	document.getElementById("add-button-cell").style.display = "";

	// 1. Hide the table and display the form
	document.getElementById("cells-view").setAttribute("style","display: none;");
	document.getElementById("cells-edit").setAttribute("style","");

	// 2. Clear all the checkboxes
	clearCellCheckboxes();
}

/**
 * This function is responsible for clearing the fields 
 * of the New/Edit Cell form.
 */
function clearCellTextFields() {

	document.getElementById("cell-inter-bw").value = "";
	document.getElementById("net-bw-ratio").value = "";

}

/**
 * This fucntion is called when the Cancel button is pressed
 * in order to present the table with the details of the 
 * Cell entries.
 */
function cancelCellButtonPressed() {

	// 0. Hide the buttons
	document.getElementById("button-group-3-cell").style.display = "none";

	// 0. Clear the checkboxes and the text fields
	clearCellCheckboxes();
	clearCellTextFields();

	// 1. Hide the New Application form and display the table with the selected application contents
	document.getElementById("cells-edit").setAttribute("style","display: none;");
	document.getElementById("cells-view").setAttribute("style","");
	document.getElementById("cells-buttons").setAttribute("style","");

}

/** 
 * This function is called when the Add button is pressed and 
 * it is responsible for adding the new Cell entry
 * to the array with the other Cells. The new Cell
 * entry is verified before added to the list.
 */
function addCellButtonPressed() {

	// 1. Create an empty application
	var newCell = {};

	// 2. Retrieve the key values from the text fields
	newCell = createCellFromFields();

	// 3. Check if its values are valid and add it to the list
	if (validNewCell(newCell)) {

		// Add it to the list
		cells[cells.length] = newCell;

		//NEW:
		hw_types_per_cell[hw_types_per_cell.length] = JSON.parse(JSON.stringify(hw_types));

		// 1. Mark the new Cell as the selected one
		selected_cell = cells.length;

		// 2. Update the Tables
		updateCellsTable();

		//NEW:
		updateHwTypesTable();

		// 3. Display the table with the details of the newly added cell
		cancelCellButtonPressed();
	} 

}

/**
 * This function is responsible for verifying whether the 
 * details of the given cell are valid.
 */
function validNewCell(newCell) {

	// 1. Assume that the details are correct
	valid = true;
	errorMessage = "";

	// 2. Check the details
	i = 1;

	if (newCell["HW_types"].length != 0) {
		// Do nothing ...             
	} else {
		valid = false;
		errorMessage += i + ". Please select at least one from the available implementations. \n";
		i++;
	}


	// Check for NaNs
	var editSection = document.getElementById("cells-edit");
	var fields = editSection.getElementsByClassName("form-control");

	for (var k = 0; k < fields.length; k++) {
		if ((!fields[k].readOnly) && (fields[k].value == "")) {
			valid = false;
			errorMessage += i + ". Please complete all the fields of the form. \n";
			i++;
			break;
		}
	}

	// 3. Check if there was at least one error
	if (!valid) {
		alert(errorMessage);
	}

	// 4. Return the outcome of the validation
	return valid;

}

/**
 * This function is responsible for retrieving the IDs of the 
 * implementations that were selected by the user through the
 * available checkboxes.
 */
function retrieveAvailImplCell() {

	// 1. Initialize the necessary variables 
	var availImpl = [];
	var k = 0;
	var list = document.getElementById("av-im-cell").getElementsByTagName("input");

	// 2. Get the selected implementations and add them to a list
	for (var i=0, length=list.length; i < length ; i++) {
		if (list[i].checked) {
			availImpl[k] = i + 1;
			k++;
		}
	}

	// 3. Return the list with the selected implementations
	return(availImpl);
}

/**
 * This function is responsible for unchecking the checkboxes
 * of the Edit form that correspond to the Available Implementations  
 * of the Cloudlightning simulator. 
 */
function clearCellCheckboxes() {
	var list = document.getElementById("av-im-cell").getElementsByTagName("input");
	for (var i=0, length = list.length; i < length ; i++) {
		list[i].checked = false;
	}
}

/**
 * This function creates a new Cell object from the values
 * provided to the form's fields by the user.
 */
function createCellFromFields() {

	// 1. Create an empty cell
	var newCell = {};

	/*
	 * 2. Add the values from the fields
	 */         
	// Set the ID of the newly added cell
	newCell["CellID"] = cells.length + 1;

	// Set the min and max values of the appropriate fields
	newCell["Cell_Interconnection_Bandwidth"] = parseFloat(document.getElementById("cell-inter-bw").value);
	newCell["Network_Bandwidth_Overcommitment_ratio"] = parseInt(document.getElementById("net-bw-ratio").value);

	// Define the selected implementations and their number
	var availImpl = retrieveAvailImplCell();
	newCell["Number_of_HW_types"] = availImpl.length;
	newCell["HW_types"] = availImpl;

	// 3. Return the Cell object
	return newCell;
}

/**
 * This function is called when the Delete button is pressed
 * in order to remove the selected cell from the cells list.
 */
function deleteCellButtonPressed() {
	
	// Ensure that a specific cell is selected by the user
	if (selected_cell != 0) {

		// Ask confirmation from the user to avoid accidental deletion
		var answer = confirm("This entry will be permanently deleted! Proceed with the action?");

		if (answer) {

			// 1. Remove the cell object from the array
			cells.splice(selected_cell - 1, 1);

			//NEW:
			hw_types_per_cell.splice(selected_cell - 1, 1);

			// 2. Update the IDs of the remaining cells
			for (var i = 0, len = cells.length; i < len; i++) {
				cells[i]["CellID"] = i + 1;
			}

			// 3. Display the first Cell (if not empty)
			if (cells.length != 0) {
				selected_cell = 1;
			} else {
				selected_cell = 0;
			}

			// 4. Update the tables
			updateCellsTable();
			//NEW:
			updateHwTypesTable();
		}
	} else {
		 alert("Please select an application entry to delete!");
	}

}

/** 
 * This function is responsible for displaying the New/Edit Cell form
 * with its fields containing the details of the selected application entry.
 */
function editCellButtonPressed() {

	// Ensure that an application entry is selected
	if (selected_cell != 0) {

		// 0. Display the Save button
		document.getElementById("button-group-3-cell").style.display = "";
		document.getElementById("save-button-cell").style.display = "";
		document.getElementById("add-button-cell").style.display = "none";

		// 1. Clear the checkboxes and reset the Accelerator Support and Rho fields
		clearCellCheckboxes();

		// 2. Hide the Cells Table and present the form
		document.getElementById("cells-view").setAttribute("style","display: none;");
		document.getElementById("cells-edit").setAttribute("style","");
		document.getElementById("cells-buttons").style.display = "none";

		// 3. Get the selected cell
		var selObj = cells[selected_cell - 1];

		// 4. Complete the text fields of the form with the details of the selected cell
		document.getElementById("cell-inter-bw").value = selObj["Cell_Interconnection_Bandwidth"];
		document.getElementById("net-bw-ratio").value = selObj["Network_Bandwidth_Overcommitment_ratio"];

		// 5. Check the appropriate checkboxes based on the selected implementations
		for (var i=0, length = selObj["HW_types"].length; i < length; i++) {
		   document.getElementById("hw" + selObj["HW_types"][i]).checked = true;
		}

	} else {
		alert("Please select an application first!");
	}
}

/**
 * This function is responsible for saving the changes made to the selected 
 * application entry.
 */
function saveCellButtonPressed() {

	// 1. Create a new Application object
	var newCell = {}

	// 2. Retrieve the values of the New/Edit Cell from the fields and set its ID
	newCell = createCellFromFields();
	newCell["CellID"] = cells[selected_cell - 1]["CellID"];

	// 3. Check if it is valid and update the selected application
	if (validNewCell(newCell)) {

		// Update the selected object
		cells[selected_cell - 1] = newCell;

		// Update the Tables
		updateCellsTable();

		// Display the table
		cancelCellButtonPressed();

		// Clear the checkboxes
		clearCellCheckboxes();
}
}

/**
 * This function is responsible for retrieving the General Properties of the 
 * produced JSON.
 */
function getGeneralFieldsAndValidate() {

	// 1. Get the values from the fields
	var max_sim_time = document.getElementById("max-sim-time").value;
	var update_interval = document.getElementById("update-interval").value;

	// 2. Check and set or inform          
	if (max_sim_time == "" || update_interval == "") {
		alert("Please define the desired min and max jobs per second before exporting the JSON.");
		return false;
	} 

	if (parseFloat(max_sim_time) < parseFloat(update_interval)) {
		alert("The update interval should not be greater than the maximum simulation time.");
		return false;
	}

	obj_cells["Maximum Simulation Time"] = parseFloat(max_sim_time);
	obj_cells["Update Interval"] = parseFloat(update_interval);
	return true;

}

/**
 * These functions are responsible for exporting the final applications list
 * in a JSON format.
 */
function exportCellsJSONtoFile2() {
	if(getGeneralFieldsAndValidate()) {
		document.getElementById("download-cells-anchor").click();
	}
}

function exportCellsJSONFile() {
	if(getGeneralFieldsAndValidate()) {
	   obj_cells["Number of Cells"] = obj_cells["Cells"].length;

	   // 1. Add the info of each HW_Type to each cell
	   mapHwTypesToCells();

	   var json = neatJSON(obj_cells, {'sort':false, 'wrap':400, 'aligned':true, 'around_colon':1 });

	   document.getElementById("download-cells-anchor").setAttribute("href", "data:application/octet-stream;," + encodeURIComponent(json));

	   // TODO: Remove this print
	   console.log(document.getElementById("download-cells-anchor"));

	}
}

/**
 * This function is responsible for retrieveing the selected Hardware Types.
 */
function refreshCellFields() {

	// 1. Retrieve the selected implementations
	var availImpl = retrieveAvailImplCell();
	return availImpl;

}

/**
 *  This function is responsible for displaying the Edit Hardware Type form,
 *  with the text fields completed with the appropriate values of the selected
 *  hardware type.
 */
function editHardwareTypeButtonPressed() {

	if ((selected_cell != 0) && (selected_hw != 0)) {
		
		// 0. Toggle the button groups
		document.getElementById("button-group-hwt").style.display = "none";
		document.getElementById("cells-buttons").style.display = "none";
		document.getElementById("button-group-3-hw").style.display = "";

		// 1. Hide the Hardware Types Table and present the Hardware Type edit form
		document.getElementById("hw-types-table-full").setAttribute("style","display: none;");
		document.getElementById("hw-types-edit").setAttribute("style","");

		// 2. Get the selected Hardware Type
		var selObj = hw_types_per_cell[selected_cell - 1][selected_hw - 1];
		console.log(selObj);

		// 3. Update the values of the text fields
		document.getElementById("num-servers").value = selObj["Number of Servers"];
		document.getElementById("num-units").value = selObj["Number_of_Proc_Units_per_Server"];
		document.getElementById("mem-per-server").value = selObj["Memory_per_Server"];
		document.getElementById("storage-per-server").value = selObj["Storage_per_Server"];
		document.getElementById("proc-over-ratio").value = selObj["Proc_Overcommitment_ratio"];
		document.getElementById("mem-over-ratio").value = selObj["Memory_Overcommitment_ratio"];
		document.getElementById("compute-cap").value = selObj["Compute_Capability"];
		document.getElementById("accelerators").value = selObj["Accelerators"];
		document.getElementById("accelerators-per-server").value = selObj["Total_Number_of_Accelerators_per_Server"];
		document.getElementById("accelerator-comp-cap").value = selObj["Accelerator_Compute_Capability"];
		document.getElementById("type-of-cpu").value = selObj["Type_of_CPU_model"];
		document.getElementById("acpu-idle-power-cons").value = selObj["CPU Idle Power Consumption"];
		document.getElementById("cpu-max-power-cons").value = selObj["CPU Max Power Consumption"];
		document.getElementById("cpu-num-points-interpol").value = selObj["CPU_Number_of_Points_for_Interpolation"];
		document.getElementById("cpu-util-bin").value = selObj["CPU Utilization Bins"];
		document.getElementById("cpu-power-cons").value = selObj["CPU Power Consuption"];
		document.getElementById("cpu-sleep-power-cons").value = selObj["CPU Sleep Power Consumption"];
		document.getElementById("type-acc-model").value = selObj["Type of Accelerator Model"];
		document.getElementById("acc-idle-power-cons").value = selObj["Accelerator Idle Power Consumption"];
		document.getElementById("acc-max-power-cons").value = selObj["Accelerator Max Power Consumption"];
		document.getElementById("acc-sleep-power-cons").value = selObj["Accelerator Sleep Power Consumption"];
		
		// Special Case: CPU (Disable Accelerator fields)
		if (selObj["HW_type_ID"] == 1) {
			document.getElementById("accelerators").readOnly = "true";
			document.getElementById("accelerators-per-server").readOnly = "true";
			document.getElementById("accelerator-comp-cap").readOnly = "true";
			document.getElementById("type-acc-model").readOnly = "true";
			document.getElementById("acc-idle-power-cons").readOnly = "true";
			document.getElementById("acc-max-power-cons").readOnly = "true";
			document.getElementById("acc-sleep-power-cons").readOnly = "true";
		} else {
			document.getElementById("accelerators").readOnly = "";
			document.getElementById("accelerators-per-server").readOnly = "";
			document.getElementById("accelerator-comp-cap").readOnly = "";
			document.getElementById("type-acc-model").readOnly = "";
			document.getElementById("acc-idle-power-cons").readOnly = "";
			document.getElementById("acc-max-power-cons").readOnly = "";
			document.getElementById("acc-sleep-power-cons").readOnly = "";
		}

	} else {
		alert("Please select a Hardware Type first.");
	}
}

/**
 * This function is responsible for saving the changes made to the selected 
 * hardware type.
 */
function saveHwButtonPressed() {

	// 1. Create a new Hardware Type object
	var newHwType = {}

	// 2. Retrieve the values of the Application from the fields and set its ID
	newHwType = createHwTypeFromFields();

	// 3. Check if it is valid and update the selected hardware type
	if (validNewHardwareType(newHwType)) {

		// Update the selected object
		hw_types_per_cell[selected_cell - 1][selected_hw - 1] = newHwType;

		// Update the Tables
		updateCellsTable();
		updateHwTypesTable();

		// Display the table
		cancelHwButtonPressed();
	}
}

/**
 * This function is responsible for creating a new Hardware Type object
 * from the values of the text fields provided by the user.
 */
function createHwTypeFromFields() {

	// 1. Create an empty hardware type
	var newHwType = {};

	/*
	 * 2. Add the values from the fields
	 */
	newHwType["HW_type_Name"] = hw_types_per_cell[selected_cell - 1][selected_hw - 1]["HW_type_Name"];
	newHwType["HW_type_ID"] = hw_types_per_cell[selected_cell - 1][selected_hw - 1]["HW_type_ID"];
	newHwType["Number of Servers"] = parseInt(document.getElementById("num-servers").value);
	newHwType["Number_of_Proc_Units_per_Server"] = parseInt(document.getElementById("num-units").value);
	newHwType["Memory_per_Server"] = parseInt(document.getElementById("mem-per-server").value);
	newHwType["Storage_per_Server"] = parseInt(document.getElementById("storage-per-server").value);
	newHwType["Proc_Overcommitment_ratio"] = parseInt(document.getElementById("proc-over-ratio").value);
	newHwType["Memory_Overcommitment_ratio"] = parseInt(document.getElementById("mem-over-ratio").value);
	newHwType["Compute_Capability"] = parseFloat(document.getElementById("compute-cap").value);
	newHwType["Accelerators"] = parseInt(document.getElementById("accelerators").value);
	newHwType["Total_Number_of_Accelerators_per_Server"] = parseInt(document.getElementById("accelerators-per-server").value);
	newHwType["Accelerator_Compute_Capability"] = parseFloat(document.getElementById("accelerator-comp-cap").value);
	newHwType["Type_of_CPU_model"] = parseInt(document.getElementById("type-of-cpu").value);
	newHwType["CPU Idle Power Consumption"] = parseInt(document.getElementById("acpu-idle-power-cons").value);
	newHwType["CPU Max Power Consumption"] = parseInt(document.getElementById("cpu-max-power-cons").value);
	newHwType["CPU_Number_of_Points_for_Interpolation"] = "";

	var bins = document.getElementById("cpu-util-bin").value.split(',');
	for (var i = 0; i < bins.length ; i++) {
		bins[i] = parseFloat(bins[i]);
	}
	newHwType["CPU Utilization Bins"] = bins;

	var power = document.getElementById("cpu-power-cons").value.split(',');
	for (var i = 0; i < power.length ; i++) {
		power[i] = parseFloat(power[i]);
	}
	newHwType["CPU Power Consuption"] = power;

	newHwType["CPU_Number_of_Points_for_Interpolation"] = newHwType["CPU Utilization Bins"].length;
	newHwType["CPU Sleep Power Consumption"] = parseInt(document.getElementById("cpu-sleep-power-cons").value);
	newHwType["Type of Accelerator Model"] = parseInt(document.getElementById("type-acc-model").value);
	newHwType["Accelerator Idle Power Consumption"] = parseInt(document.getElementById("acc-idle-power-cons").value);
	newHwType["Accelerator Max Power Consumption"] = parseInt(document.getElementById("acc-max-power-cons").value);
	newHwType["Accelerator Sleep Power Consumption"] = parseInt(document.getElementById("acc-sleep-power-cons").value);
	
	// Special Case: CPU 
	if (newHwType["HW_type_ID"] == 1) {
		newHwType["Accelerators"] = 0;
		newHwType["Total_Number_of_Accelerators_per_Server"] = 0;
		newHwType["Accelerator_Compute_Capability"] = 0;
		newHwType["Type of Accelerator Model"] = 0;
		newHwType["Accelerator Idle Power Consumption"] = 0;
		newHwType["Accelerator Max Power Consumption"] = 0;
		newHwType["Accelerator Sleep Power Consumption"] = 0;
	}

	// 3. Return the Application object
	return newHwType;
}

/**
 * This function is responsible for verifying whether the newly created 
 * hardware type contains valid values.
 */
function validNewHardwareType(newHwType) {
	
	// 1. Assume that the details are correct
	valid = true;
	errorMessage = "";

	// 2. Check the details
	i = 1;

	if (isNaN(newHwType["Proc_Overcommitment_ratio"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Prc Overcommitment ratio field. \n";
		i++;
	}

	if (isNaN(newHwType["Memory_Overcommitment_ratio"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Memory Overcommitment ratio field. \n";
		i++;
	}

	if (isNaN(newHwType["Compute_Capability"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Compute Capability field. \n";
		i++;
	}

	if (isNaN(newHwType["Accelerator_Compute_Capability"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Accelerator Compute Capability field. \n";
		i++;
	}

	if (isNaN(newHwType["Type_of_CPU_model"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Type of CPU model field. \n";
		i++;
	}

	if (isNaN(newHwType["CPU Idle Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the CPU Idle Power Consumption field. \n";
		i++;
	}

	if (isNaN(newHwType["CPU Max Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the CPU Max Power Consumption field. \n";
		i++;
	}

	if (isNaN(newHwType["CPU_Number_of_Points_for_Interpolation"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the CPU Number of Points for Interpolation field. \n";
		i++;
	}

	if (isNaN(newHwType["CPU Sleep Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the CPU Sleep Power Consumption field. \n";
		i++;
	}

	if (isNaN(newHwType["Type of Accelerator Model"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Type of Accelerator Model field. \n";
		i++;
	}

	if (isNaN(newHwType["Accelerator Idle Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Accelerator Idle Power Consumption field. \n";
		i++;
	}

	if (isNaN(newHwType["Accelerator Max Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Accelerator Max Power Consumption field. \n";
		i++;
	}

	if (isNaN(newHwType["Accelerator Sleep Power Consumption"])) {
		valid = false;
		errorMessage += i + ". Please provide a numeric value at the Accelerator Sleep Power Consumption field. \n";
		i++;
	}

	if (newHwType["CPU Utilization Bins"].length != newHwType["CPU Power Consuption"].length ) {
		valid = false;
		errorMessage += i + ". Please provide the same number of values at the 'CPU Utilization Bins' and 'CPU Power Consuption' fileds. \n";
		i++;
	}

	for (var j = 0; j < newHwType["CPU Utilization Bins"].length; j++) {
		if (isNaN(newHwType["CPU Utilization Bins"][j])) {
			valid = false;
			errorMessage += i + ". Please ensure that you provided all the desired values at the 'CPU Utilization Bins'field. \n";
			break;
		}
	}

	for (var j = 0; j < newHwType["CPU Power Consuption"].length; j++) {
		if (isNaN(newHwType["CPU Power Consuption"][j])) {
			valid = false;
			errorMessage += i + ". Please ensure that you provided all the desired values at the 'CPU Power Consuption'field. \n";
			break;
		}
	}

	// Check for NaNs
	var editSection = document.getElementById("hw-types-edit");
	var fields = editSection.getElementsByClassName("form-control");

	for (var k = 0; k < fields.length; k++) {
		if ((!fields[k].readOnly) && (fields[k].value == "")) {
			valid = false;
			errorMessage += i + ". Please complete all the fields of the form. \n";
			i++;
			break;
		}
	}

	// 3. Check if there was at least one error
	if (!valid) {
		alert(errorMessage);
	}

	// 4. Return the outcome of the validation
	return valid;
}

/**
 * This function is called when the cancel button is pressed.
 */
function cancelHwButtonPressed() {
	
	// 0. Toggle the button groups
	document.getElementById("button-group-hwt").style.display = "";
	document.getElementById("cells-buttons").style.display = "";
	document.getElementById("button-group-3-hw").style.display = "none";

	// 1. Hide the Hardware Types Table and present the Hardware Type edit form
	document.getElementById("hw-types-table-full").setAttribute("style","");
	document.getElementById("hw-types-edit").setAttribute("style","display: none;");
}     

          