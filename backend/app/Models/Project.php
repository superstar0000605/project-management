<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  protected $fillable = ['name', 'description'];

  public function developers()
  {
    return $this->belongsToMany(Developer::class);
  }
}
