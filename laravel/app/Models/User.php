<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Notifiable;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'user_id'; // Specify the new primary key column name

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true; // Set to true if `user_id` is auto-incrementing

    /**
     * The type of the auto-incrementing ID.
     *
     * @var int
     */
    protected $keyType = 'int'; // Use 'int' if `user_id` is an integer field

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'display_name',
        'username',
        'email',
        'password',
        'profile_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    /**
     * One user can have many posts.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id');
    }
    /**
     * One user can have many comments.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
    /**
     * One user can have many likes.
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class, 'user_id');
    }
    /**
     * One user can have many retweets.
     */
    public function retweets(): HasMany
    {
        return $this->hasMany(Retweet::class, 'user_id');
    }
    /**
     * One user can have many followers.
     */
    public function followers(): HasMany
    {
        return $this->hasMany(Follower::class, 'user_id');
    }
}