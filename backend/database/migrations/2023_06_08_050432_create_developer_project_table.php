<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('developer_project', function (Blueprint $table) {
          $table->increments('id');
            $table->unsignedBigInteger('developer_id');
            $table->unsignedBigInteger('project_id');
            $table->timestamps();
        
            $table->foreign('developer_id')->references('id')->on('developers')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developer_project');
    }
};
