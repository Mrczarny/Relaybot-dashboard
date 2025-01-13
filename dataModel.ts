export interface dataModel {
    // public string BotId { get; set; }
    // public int SensorFrontDistance { get; set; }
    // public int SensorLeftDistance { get; set;}
    // public int SensorRightDistance { get; set;}
    // public int MotorsSpeed { get; set;}
    // public bool IsOnLine { get; set;}
    // public DateTime Timestamp { get; set;}
    botId: string;
    sensorFrontDistance: number;
    sensorLeftDistance: number;
    sensorRightDistance: number;
    motorsSpeed: number;
    isOnLine: boolean;
    timestamp: Date;

}