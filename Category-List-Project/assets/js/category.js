let categoryList = "";
let categoryListObj  = [
	{
		item: 1,
		categoryName: 'Category 1'
	},
	{
		item: 2,
		categoryName: 'Category 2'
	},
	{
		item: 3,
		categoryName: 'Category 3'
	},
	{
		item: 4,
		categoryName: 'Category 4'
	},
	{
		item: 5,
		categoryName: 'Category 5'
	},
	{
		item: 6,
		categoryName: 'Category 6'
	}
];

// Iterating over the Category List Object to add category items.
for(let i = 0; i < categoryListObj.length; i++){
	categoryList += `<tr><td><img class="hamburger" src="assets/img/hamburger.svg" alt="hamburger icon"></td> 
						<td class="category-item">${categoryListObj[i].categoryName}</td>
						<td><div class="seq-badge text-center">${categoryListObj[i].item}</div></td>
						<td><button class="close-icon-button float-right" aria-label="Close"><img src="assets/img/close-circle.png" alt="close icon"></button></td>
					</tr>`;
}

$(document).ready(function() {

	renderCategoryData();
	$('.add-item').on('click', addCategoryContent);
	$('body').on('keyup', '#message', enableSaveButton);
	$('body').on('click', '.save-item', saveCategoryItem);
	$('body').on('keypress', "input[type='text']", saveCategoryItemOnEnter);
	$('body').on('click', '.close-icon-button', deleteCategoryIem);

	// Dynamically populating the category data from category list object.
	function renderCategoryData() {
		document.getElementById('category-list-data').innerHTML = categoryList;
	};	

	// Retains the width of the table row during Drag and Drop.
	let adjustTableWidth = function(event, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};

	// Updates Sequence count during Drag and Drop.
	let updateSequenceCount = function(event, ui) {
		$('.sortable .seq-badge').each(function (i) {
			let seqCount = i + 1;
			$(this).html(seqCount + '');
		});
	}

	// Re-sequences the Category list items during Drag and Drop.
	$( ".sortable" ).sortable({
		tolerance: "pointer",
		axis: "y",
		containment: ".sortable",
		helper: adjustTableWidth,
		stop: updateSequenceCount
	}).disableSelection();

	// Returns the sequence count for a newly added category item.
	function getSequenceCount() {
		let presentCount = $("tbody tr").length + 1 || 1;
		return presentCount;
	}

	// Click on add category to input new category tp the list.
	function addCategoryContent(event){
		let newContent = `<tr> 
							<th scope="row"><img class="hamburger" src="assets/img/hamburger.svg" alt="hamburger icon"></th>
							<td class="new-category"><input type="text" id="message" placeholder="Category Name"/></td>
							<td><div class="seq-badge text-center">${getSequenceCount()}</div></td>
							<td><button type="button" class="btn save-item float-right" disabled> Save </button> </td>
						</tr>`
		$('tbody').append(newContent);
	}

	// Save button is enabled only if the length of the input field is more than one.
	function enableSaveButton(event){
		let $saveButton = $(this).closest('tr').find('.save-item');
		$saveButton .attr('disabled', false); 
		$saveButton .prop('disabled', this.value == "" ? true : false);  
	}

	// When the item is added through the save button, it saves it to the category list.
	function saveCategoryItem(event){
		let $categoryItem = $(this).closest('tr');
		let todoText = $categoryItem.find('input').val();
		$categoryItem.find('input').val("");

		// replaces the input field with newly added category item.
		$categoryItem.find('input').remove(); 
		$categoryItem.find('.new-category').replaceWith(`<td class="category-item"> ${todoText} </td>`);

		// replaces the save button with close button.
		$categoryItem.find('button').hide();
		$categoryItem.find('.save-item').replaceWith(`<button class="close-icon-button float-right" aria-label="Close"><img src="assets/img/close-circle.png" alt="close icon"></button>`);
	}

	// When the item is added through the enter keypress, it saves it to the category list.
	function saveCategoryItemOnEnter(event){
		if(event.which === 13){
			let todoText = $(this).val();
			let $categoryItem = $(this).closest('tr');
			$categoryItem.find('button').hide();
			$categoryItem.find('.save-item').replaceWith(`<button class="close-icon-button float-right" aria-label="Close"><img src="assets/img/close-circle.png" alt="close icon"></button>`);
			$categoryItem.find('.new-category').replaceWith(`<td class="category-item"> ${todoText} </td>`);
			$(this).remove();
		}
	}

	// Delete the Category List item.
	function deleteCategoryIem(event){
		$(this).closest('tr').remove();
		event.stopPropagation();
	}
});