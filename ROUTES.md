## Auth

GET/auth/signup
- will render the signup page

POST/auth/signup
- will send information to DB and save userinformation to DB
- will render landing screeen + :userid

GET/auth/login
- will render the login page

POST/auth/login
- will send information to DB and check if username/password is typed and correct
- will render landing screeen + :userid

## User

GET/user/:userId
- will render the landing page for the logged in user
- will show map with search input 

GET/user/:userId/preferences
- will render the user preference page with checked categories

PUT or PATCH/user/:userId/preferences
- will update preference setting of user
- will redirect to landing page (/user/:userId)

# unsure routes

POST/user/:userId/location
- will take the users position automatically OR from the search input and show the location

GET/user/:userId/feed
- will render user feed with news based on preferences
- how many news in a feed?
- how to make it update when scrolling down?

POST/user/:userId/feed
- will save selected news story to users SAVED page
- will not render or refresh site (axios?)

GET/user/:userId/feed/:artID
- will render page with selected article
- OR redirect to news page?

GET/user/:userId/saved
- will render page with the news that the user has saved

DELETE/user/:userId/saved
- will remove the selected news from users saved page
- will refresh saved page


