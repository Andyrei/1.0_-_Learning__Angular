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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname', 32)->nullable();
            $table->string('province', 32)->nullable();
            $table->string('fiscalcode', 32)->unique()->nullable();
            $table->string('phone', 32)->nullable();
            $table->smallInteger('age', false, true)->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->string('email')->unique();
            $table->string('password');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
