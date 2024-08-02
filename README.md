# Baking Buddy / BreadSched v2

This repository holds a work-in-progress app inspired by a baking schedule builder I created a few years ago.
The idea is that it stores your recipes for you, notes on baking, and, the killer feature --- will automatically create a schedule
that lays out your baking timing --- when to start, what time the first rise will be done, etc. See [BreadSched](https://github.com/jakebox/breadsched) for that idea.

## Technical details
Frontend: React Native
Backend: Node.js (Express)

## What is implemented
- User registration 
- Email/password authentication (JWT tokens)
- CRUD operations for recipe (create, read, update, delete)
- Frontend:
    - Display a user's recipes
    - View recipe details
    - Modify a recipe's ingredients, propagating changes to backend


## Next-up features
- Baking conversions calculator (e.g. volumes to masses of ingredients)
- Baking schedule generation (already written in Python from old project, so port this over)

![mockup](figma_mockup.png)