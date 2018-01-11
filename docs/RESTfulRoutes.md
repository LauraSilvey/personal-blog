| Name    | Path  | HTTP Verb | Purpose  | Mongoose Method |
|---------|---|---|---|
| Index   | /posts | GET | List of all posts | Post.find() |
| New     | /posts/new | GET | Show new post form | N/A |
| Create  | /new | POST | Create a new post; then redirect | Post.create() |
| Show    | /posts/:id | GET | Show info for one specific post | Post.findById() |
| Edit    | /posts/:id/edit | GET | Show edit form for one post | Post.findById() |
| Update  | /posts/:id | PUT | Update selected post; then redirect | Post.findByIdAndUpdate() |
| Destroy | /posts/:id | DELETE | Delete selected post; then redirect | Post.findByIdAndRemove() |
