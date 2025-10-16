<?php

namespace App\Core;

use PDO;

class Database {
    private static ?PDO $instance = null;
    private function __construct() {}

    public static function getInstance(): PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: 'localhost';
            $port = getenv('DB_PORT') ?: 1433;
            $dbname = getenv('DB_NAME');
            $user = getenv('DB_USER');
            $pass = getenv('DB_PASS');

            $dsn = "sqlsrv:Server=$host,$port;Database=$dbname";

            try {
                self::$instance = new PDO($dsn, $user, $pass);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                error_log("Conexión a la base de datos establecida.");
            } catch (\PDOException $e) {
                error_log("Error de conexión a la base de datos: " . $e->getMessage());
                die("Error de conexión a la base de datos.");
            }
        }
        return self::$instance;
    }


}

?>