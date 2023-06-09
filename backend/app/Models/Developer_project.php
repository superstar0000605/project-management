<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer_project extends Model
{
  protected $fillable = ['project_id', 'developer_id'];
  protected $table = 'developer_project';
  use HasFactory;
}