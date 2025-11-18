class Constants{
    
    //Esta clase no tiene constructor porque es utilitaria.

    //Frames per second
    static FPS = 1000/60;

    //Speed
    static SKY_PACE = 0.3;
    static SPACECRAFT_SPEED_X = 3;
    static ENEMY_PAWN_SPEED_X = 1;
    static LASER_BEAM_SPEED_Y = 5;

    //Keycodes
    static ARROW_LEFT = 37;
    static ARROW_RIGHT = 39;
    static ARROW_UP = 38;
    static ARROW_DOWN = 40;
    static SPACE_BAR = 32;

    //Margins
    static MARGIN_RIGHT = 40;
    static MARGIN_LEFT = 40;
    static MARGIN_ENEMY_X = 10;
    static MARGIN_ENEMY_Y = 10;

    //Enemie's original positions
    static INITIAL_Y = 200;
    static INITIAL_WEAK_Y = this.INITIAL_Y;
    static INITIAL_NORMAL_Y = (this.INITIAL_Y + (-22 -10));
    static INITIAL_STRONG_Y = (this.INITIAL_Y + ((-22 -10) * 2));

    //Enemy types
    // static ENEMY_TYPE_A = "special";
    // static ENEMY_TYPE_B = "final-boss";
    // static ENEMY_TYPE_C = "mini-boss";
    static ENEMY_TYPE_A = "strong";
    static ENEMY_TYPE_B = "normal";
    static ENEMY_TYPE_C = "weak";

    //Weapons
    static RELOAD_TIME = 200;

    //Debug mode
    static DEBUG = false;
}