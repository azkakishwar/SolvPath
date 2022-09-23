
$(document).ready(function(){
	hideMessages();
	resetTopNewsTab();
	resetSearchNewsTab();
	$("#q_more_details").hide();

	$("#maxTopNews").focusout(function(){
		$(this).val(validateMaxInput($(this).val()));
	});
	$("#maxSearchNews").focusout(function(){
		$(this).val(validateMaxInput($(this).val()));
	});
});

function hideMessages(){
	$('#error').hide();
	$('#info').hide();
}

function resetTopNewsTab(){
	$('#topNewsResults').hide();
	$("#maxTopNews").val("");
	$("#langTopNews").val("en");
}

function resetSearchNewsTab(){
	$('#searchNewsResults').hide();
	$("#searchKeyword").val("");
	$("#maxSearchNews").val("20");
	$("#langSearchNews").val("en");
	$('input[type=checkbox]').each(function(i, el){
		$(el).prop('checked', false)
	});
}

function showDetails(){
	$("#q_more_details").show();
	$("#q_more").hide();
}

function hideDetails(){
	$("#q_more_details").hide();
	$("#q_more").show();
}

function validateMaxInput(value){
	if(value !== ""){
  		if(value < 1){
  			return 1;
  		} else if(value > 20){
  			return 20;
  		}
  	}
  	return value;
}

function showError(message){
	$('#error').html(message);
	$('#error').show();	
}

function showInfo(message){
	$('#info').html(message);
	$('#info').show();	
}

function showHoldOn(){
	HoldOn.open({
     		theme:"sk-dot"
	});
}

function closeHoldOn(){
	HoldOn.close();
}

function getTopNews(){
	if($("#maxTopNews").val() === ""){
		showError("Please enter number of articles first.");
	} else{
		showHoldOn();
		$('#topNewsResults').hide();
		hideMessages();

		$.ajax({
			url: "/gnews/top-news", 
			data:{
				"max": $("#maxTopNews").val(),
				"lang": $("#langTopNews").val()
			},
			success: function(result){
				if("errors" in result) {
					showError(Object.values(result['errors'])[0]);
				}
				else if("articles" in result){
					if(result['articles'].length == 0){
						showInfo("No results found")
					} 
					else {
						$('#topNewsJsonViewer').jsonViewer(result['articles']);	
						resetTopNewsTab();
						$('#topNewsResults').show();
		
					}
				}
				closeHoldOn();
			},
			error: function(res){
				if("errors" in res) {
					showError(res['errors']);
				}
				else{
					showError("Unable to fetch news. Please try again.");
				}				
				closeHoldOn();
			}
		});
	}
}

function searchNews(){
	if($('#searchKeyword').val() === ""){
		showError("Please enter keyword to search first.");
	}
	
	else if($('input[type=checkbox]:checked').length === 0){
		showError("Please select at least one option to search in.");
	}
	
	else if($("#maxSearchNews").val() === ""){
		showError("Please enter number of articles first.");
	} 
	
	else {
		showHoldOn();
		hideMessages();
		$('#searchNewsResults').hide();
		
		var search_in = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox) => checkbox.value);
		$.ajax({
			url: "/gnews/search-news", 
			data:{
				"max": $("#maxSearchNews").val(),
				"lang": $("#langSearchNews").val(),
				"q": $('#searchKeyword').val(),
				"in": search_in.join(",")
			},
			success: function(result){
				if("errors" in result) {
					showError(Object.values(result['errors'])[0]);
				}
				else if("articles" in result){
					if(result['articles'].length == 0){
						showInfo("No results found");
					} 
					else{
						$('#searchNewsJsonViewer').jsonViewer(result['articles']);	
						resetSearchNewsTab();
						$('#searchNewsResults').show();
					}
				}
				closeHoldOn();
			},
			error: function(res){
				if("errors" in res) {
					showError(res['errors']);
				}
				else{
					showError("Unable to fetch news. Please try again.");
				}
				closeHoldOn();
			}
		});
	}
}
