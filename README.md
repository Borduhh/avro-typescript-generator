# avro-typescript-generator

A quick CLI tool that converts AVRO schemas to typescript `d.ts` files.

## Usage

### Basic Usage

```
avro-typescript --input 'schemas/**/*.avsc' --outputDir 'types'
```

### Multiple Inputs

```
avro-typescript --input 'schemas/**/*.avsc' --input 'events/**/*.avsc' --outputDir 'types'
```

## Future Improvements

- [ ] Allow Logical types to be passed in from a file
