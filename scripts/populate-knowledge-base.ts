import { RAGProcessor } from '../lib/ragProcessor'
import { vectorStore } from '../lib/vectorStore'

const initialContent = [
  {
    content: `# Basic Tool Safety Guidelines

## Essential Safety Rules for DIY Projects

### Personal Protective Equipment (PPE)
- Always wear safety glasses when using power tools
- Use hearing protection for loud tools like drills and saws
- Wear gloves when handling sharp materials
- Use dust masks when sanding or cutting

### Tool Handling
- Keep tools clean and in good condition
- Never use damaged or broken tools
- Always unplug power tools before changing bits or blades
- Keep your work area well-lit and organized

### Emergency Preparedness
- Know where your first aid kit is located
- Keep emergency numbers handy
- Have a fire extinguisher nearby when using heat tools
- Work with a buddy for dangerous tasks

### Common Hazards to Avoid
- Loose clothing around power tools
- Working when tired or distracted
- Using tools you're not familiar with
- Rushing through projects

Remember: Safety first, project second!`,
    metadata: {
      source: 'ShopMandy Safety Guide',
      title: 'Basic Tool Safety Guidelines',
      category: 'Safety',
      tags: ['safety', 'tools', 'PPE', 'guidelines']
    }
  },
  {
    content: `# Hammer Basics for Beginners

## Types of Hammers

### Claw Hammer
- Most common type for general use
- Has a flat striking face and curved claw for pulling nails
- Weight: 16-20 oz is ideal for beginners
- Use for: Driving nails, light demolition, general carpentry

### Ball Peen Hammer
- Rounded striking face on one end
- Used for metalworking and shaping metal
- Weight: 8-32 oz depending on work
- Use for: Metal shaping, riveting, jewelry making

### Rubber Mallet
- Soft striking surface won't damage materials
- Great for assembling furniture
- Weight: 8-16 oz
- Use for: Furniture assembly, delicate work, adjusting parts

## Proper Hammer Technique

### Grip
- Hold near the end of the handle for maximum power
- Use a firm but not tight grip
- Keep your wrist straight

### Swing
- Use your arm, not just your wrist
- Follow through with your swing
- Keep your eye on the target

### Safety Tips
- Always wear safety glasses
- Check that the hammer head is secure
- Use the right hammer for the job
- Keep your work area clear`,
    metadata: {
      source: 'ShopMandy Tool Guide',
      title: 'Hammer Basics for Beginners',
      category: 'Tools',
      tags: ['hammer', 'tools', 'beginners', 'technique']
    }
  },
  {
    content: `# DIY Wall Painting Guide

## Pre-Painting Preparation

### Surface Preparation
- Clean walls thoroughly with mild soap and water
- Remove any loose paint or wallpaper
- Fill holes and cracks with spackle
- Sand rough areas until smooth
- Apply primer for better paint adhesion

### Room Preparation
- Remove or cover furniture
- Cover floors with drop cloths
- Use painter's tape for clean edges
- Open windows for ventilation
- Turn off electrical outlets

## Painting Techniques

### Cutting In
- Use a 2-3 inch angled brush
- Paint edges and corners first
- Work in small sections
- Keep a wet edge to avoid lap marks

### Rolling
- Use appropriate roller nap for surface texture
- Start from the top and work down
- Use a W pattern for even coverage
- Don't overload the roller

### Paint Selection
- Flat: Best for ceilings and low-traffic areas
- Eggshell: Good for living rooms and bedrooms
- Satin: Great for bathrooms and kitchens
- Semi-gloss: Perfect for trim and high-traffic areas

## Clean Up
- Clean brushes and rollers immediately
- Store paint properly
- Dispose of paint waste responsibly
- Remove painter's tape before paint dries completely`,
    metadata: {
      source: 'ShopMandy DIY Guide',
      title: 'DIY Wall Painting Guide',
      category: 'Home Improvement',
      tags: ['painting', 'walls', 'DIY', 'home improvement']
    }
  },
  {
    content: `# Basic Electrical Safety for DIY

## Understanding Electrical Basics

### Voltage and Current
- Household voltage is typically 120V
- Current is measured in amps
- Power is measured in watts
- Always turn off power at the breaker before working

### Common Electrical Tools
- Voltage tester: Essential for safety
- Wire strippers: Remove insulation safely
- Wire nuts: Secure wire connections
- Electrical tape: Insulate connections

## Safety Rules

### Before Starting
- Turn off power at the main breaker
- Test wires with voltage tester
- Work in dry conditions only
- Use proper tools and materials

### During Work
- Never work on live circuits
- Keep one hand in your pocket
- Use insulated tools
- Don't work alone on electrical projects

### Common Projects

#### Replacing Outlets
- Turn off power
- Remove old outlet
- Connect new outlet (black to brass, white to silver, green to green)
- Secure in box
- Test before restoring power

#### Installing Light Fixtures
- Turn off power
- Remove old fixture
- Connect wires (match colors)
- Secure fixture to box
- Install bulbs and test

## When to Call a Professional
- Panel upgrades
- New circuit installation
- Commercial work
- Any work you're unsure about

Remember: Electricity can be deadly. When in doubt, call a licensed electrician!`,
    metadata: {
      source: 'ShopMandy Electrical Guide',
      title: 'Basic Electrical Safety for DIY',
      category: 'Electrical',
      tags: ['electrical', 'safety', 'DIY', 'wiring']
    }
  },
  {
    content: `# Furniture Assembly Tips

## Essential Tools for Assembly

### Basic Tools
- Phillips and flathead screwdrivers
- Allen wrenches (usually included)
- Rubber mallet for gentle tapping
- Level for checking alignment
- Measuring tape for accuracy

### Power Tools (Optional)
- Cordless drill with various bits
- Impact driver for stubborn screws
- Stud finder for wall mounting

## Assembly Best Practices

### Before Starting
- Clear your workspace
- Organize all parts and hardware
- Read instructions completely
- Check that all parts are present
- Lay out parts in order of assembly

### During Assembly
- Work on a flat, level surface
- Don't overtighten screws
- Use the right tool for each fastener
- Keep hardware organized
- Take breaks for complex projects

### Common Assembly Types

#### Flat-Pack Furniture
- Follow the numbered sequence
- Don't skip steps
- Check alignment before tightening
- Use wood glue for extra strength (if recommended)

#### Ready-to-Assemble (RTA)
- Usually requires more tools
- May need wood glue
- Check for pre-drilled holes
- Test fit before final assembly

## Troubleshooting

### Common Issues
- Missing parts: Contact manufacturer
- Stripped screws: Use larger bit or replace
- Misaligned holes: Check instructions again
- Wobbly furniture: Check all connections

### Tips for Success
- Take your time
- Don't force parts together
- Keep instructions handy
- Work in good lighting
- Ask for help when needed`,
    metadata: {
      source: 'ShopMandy Assembly Guide',
      title: 'Furniture Assembly Tips',
      category: 'Assembly',
      tags: ['furniture', 'assembly', 'DIY', 'tools']
    }
  }
]

async function populateKnowledgeBase() {
  try {
    console.log('Initializing vector store...')
    await vectorStore.initializeTable()
    
    console.log('Adding initial content to knowledge base...')
    const ragProcessor = new RAGProcessor()
    
    for (const item of initialContent) {
      try {
        const id = await ragProcessor.addToKnowledgeBase(item.content, item.metadata)
        console.log(`Added: ${item.metadata.title} (ID: ${id})`)
      } catch (error) {
        console.error(`Failed to add ${item.metadata.title}:`, error)
      }
    }
    
    console.log('Knowledge base population completed!')
  } catch (error) {
    console.error('Failed to populate knowledge base:', error)
  }
}

// Run if called directly
if (require.main === module) {
  populateKnowledgeBase()
}

export { populateKnowledgeBase } 