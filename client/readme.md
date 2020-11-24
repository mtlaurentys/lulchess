# LULChess Client Implementation

---
---

## 1. API Documentation

---

### Sends

- `"getPieces"`: Retrieves pieces and their actions.

- `"createMatch"`: Creation of a new room.

- `"getActiveRooms"`: List of the active rooms.

- `"leaveRoom"`: Tells user left current room.

- `"tryJoin"`: Tells the user wants to join the respective room.

---

# Interprets

- `"uID"`, session ID - string.

- `"activeRooms"`, Information of each active room - Array of objects.

- `"createdRoom"`, ID of the room created - int.

- `"notCreated"`, Signals the requested room was not created.

- `"leftRoom"`, Signals that it succesfully left the room.

- `"joined"`, ID of the room the client joined - int.

- `"notJoin"`, Signals it did not join a requested room.

---
---

## 2. Handling Server Requests

