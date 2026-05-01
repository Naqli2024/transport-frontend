export const JOURNEY_TYPES = [
  { id:"oneway", label:"One-Way Load", icon:"→", color:"#3B82F6", desc:"Truck goes A→B with load. Returns empty or on its own.", legs:["Origin → Destination"], tag:"Single Leg" },
  { id:"roundtrip", label:"Round Trip", icon:"⇄", color:"#10B981", desc:"A→B with load, B→A with return load from another party.", legs:["Origin → Destination","Destination → Origin (Return Load)"], tag:"2 Legs" },
  { id:"multileg", label:"Multi-Leg (Hub & Spoke)", icon:"⟳", color:"#F59E0B", desc:"A→B→C. Deliver at B, pick new load to C, then return.", legs:["Origin → Stop 1","Stop 1 → Stop 2","Stop 2 → Origin"], tag:"3 Legs" },
  { id:"crossregion", label:"Cross-Region Relay", icon:"↬", color:"#8B5CF6", desc:"Long-haul trip with driver relay handoff at midpoint depot.", legs:["Origin → Relay Point","Relay Point → Destination"], tag:"Driver Relay" },
  { id:"dedicated", label:"Dedicated Fleet Run", icon:"∞", color:"#F97316", desc:"Fixed route, recurring trips for one customer.", legs:["Fixed Route (Repeating)"], tag:"Recurring" },
];