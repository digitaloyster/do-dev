<?php
// Stage 1

$d = false;
require('./includes/debugFunctions.php');

//TODO: 1. Receive data from LP
//var_dump($_POST);

$dobM = 0;
switch ($_POST['dobm']) {
    case "1":
        $dobM="01";
        break;
    case "2":
        $dobM="02";
        break;
    case "3":
        $dobM="03";
        break;
    case "4":
        $dobM="04";
        break;
    case "5":
        $dobM="05";
        break;
    case "6":
        $dobM="06";
        break;
    case "7":
        $dobM="07";
        break;
    case "8":
        $dobM="08";
        break;
    case "9":
        $dobM="09";
        break;
    case "10":
        $dobM="10";
        break;
    case "11":
        $dobM="11";
        break;
    case "12":
        $dobM="12";
        break;


}

if (strlen($_POST['dobd']) == 1) {$dobD =  "0".$_POST['dobd'];}
else {$dobD = $_POST['dobd'];}

$phone = $_POST["telephone"];
if (substr($phone, 0, 2) == '44') $phone = "0".substr($phone, 2);
if (substr($phone, 0, 3) == '+44') $phone = "0".substr($phone, 3);
if (substr($phone, 0, 1) != '0') $phone = "0".$phone;
$phone = str_replace(' ', '', $phone);

//$find = "'";
//$apos = "&apos;"; REMOVED APOS FIX 070519

//$data['actions'] = "api/create_application";
//$data['api_access_key'] = "gh3ZgzHzHklrvghxUqILwkvGrZTZ0drq";
//$data['api_secret_key'] = "sEztt8qVNeSioVz42Rf0hxzfVfoWCGjH";
$data['title'] = $_POST["title"];
$data['first_name'] = addslashes(ucwords($_POST["first_name"]));
$data['last_name'] = addslashes(ucwords($_POST["last_name"]));
$data['telephone'] = $phone;
$data['email_address'] = addslashes($_POST['email_address']);
$data['address']['addr1'] = addslashes($_POST['add1']);
$data['address']['addr2'] = addslashes($_POST['add2']);
$data['address']['addr3'] = addslashes($_POST['add3']);
$data['address']['addr4'] = addslashes($_POST['add4']);
$data['address']['postcode'] = addslashes($_POST['postcode']);
$data['address']['addr_time_years'] = "10";
$data['address']['addr_time_months'] = "0";
$data['dob'] = $dobD."/".$dobM."/".$_POST['doby'];
$dob['dobd'] = (string) $dobD;
$dob['dobm'] = (string) $dobM;
$dob['doby'] = (string) $_POST['doby'];

$data['lenders'] = $_POST['multilender'];
$data['lenderTypes'] = $_POST['multitype'];

//$data['lenders'] = $_POST['multilender'];

/*for ($i = 1; $i <= 8; $i++) {
    //echo 'lender'.$i;
    if ($_POST['lender_'.$i]!=='') {
        $lenders[] = $_POST['lender_'.$i];
        $lenderTypes[] = $_POST['acctype'.$i];
    }
}

$data['lenders'] = implode(',', $lenders);
$data['lenderTypes'] = implode(',', $lenderTypes);
*/



//$data['tcs_agreed'] = "";
//$data['signature_rating'] = "";
//$data['previous_addresses'] = array();
//$data['previous_surname'] = "";
require('./includes/dbFunctions.php');
//TODO: 0a Check for dupes
if (checkEmail($data['email_address'])) {
    echo "email exists";
    exit();
}

//TODO: 1a. Get creditor_id from MySQL

//TODO: 2. Post to Refund

//NOTE: {"success":true,"application_id":"86707326","agreements":{"1":"CR86707328","2":"CR86707329"}}

//TODO: 2a. Post to DB

//Add date of birth in separate fields after posting to wfac
$data['dobd'] = (integer) $dob['dobd'];
$data['dobm'] = (integer) $dob['dobm'];
$data['doby'] = (integer) $dob['doby'];

//var_dump($data);
$ref = insertNewRef($data);
debug(date("Y-m-d H:i:s")." - ".$ref, 'Logs/API_1_ref.log');
echo $ref;
