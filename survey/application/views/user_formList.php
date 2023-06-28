<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>survey</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

	<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->

	<!-- bootstrap jquery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

	<!-- fontawesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">

	<!-- multi select start -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
	<!-- multi select end -->

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

	<link rel="stylesheet" type="text/css" href="<?= base_url("assets/css/form.css")?>">
	<link rel="stylesheet" type="text/css" href="<?= base_url("assets/css/table.css")?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url("assets/css/page.css")?>">
    <script type="text/javascript" src="<?= base_url("assets/js/verify.js")?>"></script>	
	<script type="text/javascript" src="<?= base_url("assets/js/page.js")?>"></script>
	<script type="text/javascript" src="<?= base_url("assets/js/user_formList.js")?>"></script>
	<style type="text/css">
	
.modal-footer2 {
  padding: 15px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
}
.modal-footer2 .btn + .btn {
  margin-bottom: 0;
  margin-left: 5px;
}
.modal-footer2 .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer2 .btn-block + .btn-block {
  margin-left: 0;
}
	</style>
</head>
<body>
	<div class="header">
        <!-- <script src="<?= base_url("assets/js/header.js")?>"></script> -->
		<div class="form_tab">
			<span><strong>待填問卷</strong></span>
		</div>
	</div>
	<div class="form_body">
		<table width="100%" id="tableid">
            
        </table>
		<div id="wr-page">

		</div>
	</div>

	<!-- form Modal -->
	<div class="modal fade bd-example-modal-lg firstPop" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	  	<div class="modal-dialog" style="min-width: 80%;" role="document">
		    <div class="modal-content">
		        <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLongTitle" style="color: blue;font-weight:bold;">填寫須知</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
		        </div>
		        <div id="detail_table" class="modal-body">
		        	
		        </div>
		        <div class="modal-footer2">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal" style="font-size: 20px">上一頁</button>
		        </div>
		    </div>
		</div>
	</div>

	<script>
		getList();
	</script>
</body>
</html>