<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
  protected $fillable = ['name', 'email'];
  public function projects()
  {
    return $this->belongsToMany(Project::class);
  }
  use HasFactory;
}