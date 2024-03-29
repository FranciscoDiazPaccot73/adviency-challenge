const POSSIBLE_GIFTS = [
  "Smartwatch",
  "Wireless Earbuds",
  "Bluetooth Speaker",
  "Virtual Reality Headset",
  "Fitness Tracker",
  "Robot Vacuum Cleaner",
  "Smart Home Hub",
  "Smart Thermostat",
  "Smart Doorbell",
  "Streaming Device (e.g., Roku, Apple TV)",
  "Drones",
  "Wireless Charging Pad",
  "Bluetooth Keyboard",
  "Gaming Mouse",
  "External Hard Drive",
  "Noise-Canceling Headphones",
  "Digital Camera",
  "3D Printer",
  "Smart Light Bulbs",
  "Smart Plugs",
  "Smart Lock",
  "Touchscreen Gloves",
  "Solar Charger",
  "Digital Drawing Tablet",
  "Smart Garden Kit",
  "Augmented Reality Glasses",
  "Portable Projector",
  "Smart Mirror",
  "WiFi Range Extender",
  "Smart Scale",
  "Bluetooth Tracker (e.g., Tile)",
  "Smart Water Bottle",
  "Foldable Keyboard",
  "E-Reader",
  "Smart Coffee Maker",
  "Wireless Charging Mouse Pad",
  "LED Strip Lights",
  "Smart Luggage",
  "Smart Notebook",
  "Fitness Smart Water Bottle",
  "Smart Desk Lamp",
  "Mini Projector",
  "Digital Photo Frame",
  "Smart Backpack",
  "Bluetooth Beanie",
  "Car Phone Mount with Wireless Charging",
  "Smart Alarm Clock",
  "Smart Plant Pot",
];

export default async function (_, res) {
  const randomIndex: number = Math.floor(Math.random() * POSSIBLE_GIFTS.length);
  const gift = POSSIBLE_GIFTS[randomIndex];

  res.status(200).json({ gift });
}
