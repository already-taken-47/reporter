<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePicturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('pictures')) {
            Schema::create('pictures', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('building_id')->unsigned();
                $table->string('url', 200);
                $table->string('path', 200);
                $table->string('alt', 50);
                $table->foreign('building_id')
                    ->references('id')->on('buildings')
                    ->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pictures');
    }
}
