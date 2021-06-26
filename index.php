<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id_usuario'])){
        $query="select * from tbl_usuario where id_usuario=".$_GET['id_usuario'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from tbl_usuario";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre_usuario=$_POST['nombre_usuario'];
    $cedula_usuario=$_POST['cedula_usuario'];
    $telefono_usuario=$_POST['telefono_usuario'];
    $mail_usuario=$_POST['mail_usuario'];
    $query="insert into tbl_usuario(nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario) values ('$nombre_usuario', '$cedula_usuario', '$telefono_usuario', '$mail_usuario')";
    $queryAutoIncrement="select MAX(id_usuario) as id_usuario from tbl_usuario";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id_usuario=$_GET['id_usuario'];
    $nombre_usuario=$_POST['nombre_usuario'];
    $cedula_usuario=$_POST['cedula_usuario'];
    $telefono_usuario=$_POST['telefono_usuario'];
    $mail_usuario=$_POST['mail_usuario'];
    $query="UPDATE tbl_usuario SET nombre_usuario='$nombre_usuario', cedula_usuario='$cedula_usuario', telefono_usuario='$telefono_usuario', mail_usuario='$mail_usuario' WHERE id_usuario='$id_usuario'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id_usuario=$_GET['id_usuario'];
    $query="DELETE FROM tbl_usuario WHERE id_usuario='$id_usuario'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>