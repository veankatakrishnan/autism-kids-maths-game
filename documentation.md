# Autism Math Learning App - Theoretical Framework & Documentation

## Overview
The **Autism Math Learning App** is a specialized educational tool designed to teach fundamental mathematical concepts—rounding, place value, and Roman numerals—to children with Autism Spectrum Disorder (ASD). The application leverages evidence-based strategies such as visual supports, interactive manipulatives, and structured reinforcement to enhance learning outcomes.

## Theoretical Framework

### 1. Visual Learning & Processing
Children with ASD often demonstrate strong visual processing skills. This application utilizes **Visual Scaffolding** to bridge abstract concepts with concrete representations:
- **Number Line (Rounding Game)**: Provides a spatial representation of numbers, allowing users to visually determine proximity to the nearest ten.
- **Color-Coded Blocks (Place Value)**: Uses distinct colors (Red for Hundreds, Blue for Tens, Yellow for Ones) to segment and categorize numerical values, reducing cognitive load.
- **Pattern Matching (Roman Numerals)**: Relies on visual charts to aid in decoding and encoding Roman numerals.

### 2. Interactive Manipulatives
Tactile and digital manipulatives are crucial for **Constructivist Learning**.
- **Place Value Builder**: Allows children to "build" numbers by adding/removing blocks. This active construction reinforces the concept that numbers are composed of smaller units.
- **Real-time Feedback**: Immediate visual and auditory cues (e.g., color changes, score updates) provide **Positive Reinforcement**, a core component of Applied Behavior Analysis (ABA).

### 3. Review & Repetition
- **Screen Recording**: The built-in screen capture feature enables parents/educators to review sessions, identifying struggle points and progress over time.
- **Analytics**: Data-driven insights help track mastery of specific skills, allowing for personalized intervention.

## Architectural Design

### Component-Based Architecture (React)
The application is built using React to ensure modularity and reusability.
- **`Layout`**: Wraps the application with a consistent Header and Footer, providing stable navigation—key for users who thrive on routine.
- **`Header`**: Contains navigation links to the home page, analytics, and an external link to the "Festivals Game" for broader learning.
- **`Game Modules`**: Each game is a self-contained component (`RoundingGame`, `PlaceValueGame`, `RomanNumeralsGame`) managing its own state and logic.

### State Management
- **Local State (`useState`)**: Manages immediate game interactions (e.g., current number, selected block).
- **Persistent State (`localStorage`)**: Stores interaction logs and analytics data, ensuring progress is tracked across sessions without requiring a complex backend.

### Accessibility & UX
- **Clear Typography**: Uses `Inter` font for high readability.
- **Contrast & Colors**: A soft, pastel color palette reduces sensory overload while maintaining sufficient contrast for focus elements.
- **Keyboard Navigation**: Full keyboard support ensures accessibility for users with fine motor control challenges.

## Integration
The application integrates with the wider ecosystem of autism learning tools by linking to the existing **Festivals Game** (hosted at `https://veankatakrishnan.github.io/festivals-autism-kids-game/`), creating a cohesive learning suite.
