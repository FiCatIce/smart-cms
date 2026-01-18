<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('call_servers', function (Blueprint $table) {
        // Tambahkan kolom workspace_id
        $table->uuid('workspace_id')->nullable()->after('id');
        $table->index('workspace_id'); // Biar pencarian cepat
    });
}

public function down()
{
    Schema::table('call_servers', function (Blueprint $table) {
        $table->dropColumn('workspace_id');
    });
}
};
