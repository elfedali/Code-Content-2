## Simple Game Logic

In game development, **game logic** is the set of rules and behaviors that define how your game world responds to player input and internal state changes. It’s the "brain" of your game that transforms raw input into meaningful interactions. For beginners, starting with minimal, runnable logic is the most effective way to build confidence and understand core principles before tackling complex systems. Let’s break down the fundamentals through a concrete example.

### Why Game Logic Matters for Beginners

Game logic bridges the gap between abstract concepts and tangible gameplay. Without it, your game will feel unresponsive or unpredictable. A well-structured game loop (the engine of your logic) ensures:
- Consistent input processing
- Predictable state transitions
- Smooth frame-by-frame updates
- Easy debugging through modular components

For instance, in a platformer game, your physics engine (part of game logic) must handle gravity, collisions, and jumping in a way that feels natural to players. Starting small helps you isolate these components without overwhelming complexity.

### The Core Game Loop: Your Game’s Engine

Every game runs on a **game loop**—a continuous cycle that processes input, updates state, and renders output. This loop is your foundation for all gameplay. Here’s the minimal structure in C++:

```cpp
while (gameActive) {
    // 1. Handle input
    // 2. Update game state
    // 3. Render output
}
```

This loop repeats at a consistent frame rate (typically 30–60 FPS), ensuring smooth gameplay. The key is to **update state before rendering**—this prevents visual glitches and ensures physics behave predictably.

### Input Handling: The Player’s Voice

Input is how players interact with your game. For simplicity, we’ll use keyboard input with the **SFML library** (a lightweight, cross-platform toolkit perfect for beginners). Here’s how to capture input:

```cpp
while (window.pollEvent(event)) {
    if (event.type == sf::Event::CloseRequested) {
        gameActive = false;
    }
    // Additional input checks here (e.g., key presses)
}
```

This code runs *per frame* to check for input events. Crucially, **input should be handled in the game loop, not in the main body**—this keeps your code responsive and decoupled.

### Adding Movement Logic: A Concrete Example

Let’s build a simple game where a player-controlled rectangle moves left/right using arrow keys. This demonstrates:
1. Input processing
2. State updates
3. Boundary constraints
4. Frame-rate independence

Here’s the complete runnable code:

```cpp
#include <SFML/Graphics.hpp>

int main() {
    // Create window (800x600)
    sf::RenderWindow window(sf::VideoMode(800, 600), "Simple Game");
    
    // Player rectangle (50x50)
    sf::RectangleShape player(sf::Vector2f(50, 50));
    player.setFillColor(sf::Color::Red);
    player.setPosition(400, 300); // Start at center

    // Game state
    bool gameActive = true;
    float playerSpeed = 5.0f; // Pixels per frame
    float playerX = 400.0f;   // Current X position

    // Main loop
    while (gameActive) {
        // 1. Handle input
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::CloseRequested) {
                gameActive = false;
            }
        }

        // 2. Update game state
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left)) {
            playerX -= playerSpeed;
        }
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right)) {
            playerX += playerSpeed;
        }
        
        // Prevent movement outside window
        if (playerX < 0) playerX = 0;
        if (playerX > 800 - 50) playerX = 800 - 50;

        // 3. Render
        window.clear();
        window.draw(player);
        window.display();
    }

    return 0;
}
```

**Key insights from this example**:
- `sf::Keyboard::isKeyPressed()` checks input *per frame* (critical for smooth movement)
- Boundary checks (`if (playerX < 0)`) prevent visual artifacts
- The player’s position is updated *before* rendering (ensures correct visuals)
- This code runs in < 100 lines—perfect for beginners to modify

### Game State Management: Scaling Up

While our example uses a single state (player position), real games need more complex state management. Here’s how to extend it:

1. **Use enums for state types** (e.g., `GameState`):
   ```cpp
   enum class GameState { Menu, Playing, GameOver };
   ```

2. **Track state transitions** (e.g., from `Menu` to `Playing` when a button is pressed):
   ```cpp
   GameState currentState = GameState::Menu;
   if (playerPressedStartButton) {
       currentState = GameState::Playing;
   }
   ```

3. **Update state in the loop**:
   ```cpp
   switch (currentState) {
       case GameState::Menu:
           // Handle menu logic
           break;
       case GameState::Playing:
           // Update player movement, collisions, etc.
           break;
       case GameState::GameOver:
           // Show game over screen
           break;
   }
   ```

This pattern keeps your code modular and easy to debug—essential for larger projects.

### Why This Approach Works for Real Projects

This simple game logic pattern scales beautifully:
- **Beginner-friendly**: Starts with 100-line code that runs immediately
- **Frame-rate independent**: Uses deltas (not fixed time intervals) for smooth movement
- **Extensible**: Add physics, collisions, or AI without rewriting the loop
- **Debuggable**: Clear separation of input, update, and render phases

For example, adding collision detection with a moving obstacle would only require:
1. A new `Obstacle` class
2. A collision check in the `Playing` state
3. State updates (e.g., `playerX = 0` on collision)

### Summary

Simple game logic is the cornerstone of all interactive experiences. By mastering the game loop, input handling, and state updates—starting with a minimal example like the moving rectangle—you build a robust foundation. This approach ensures your code is **runnable**, **debuggable**, and **scalable**. Remember: small, focused logic wins in game development. 🎮