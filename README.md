[![Continuous Integration](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Replace Superclass With Delegate

**Formerly: Replace Inheritance with Delegation**

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
class List { ... }
class Stack extends List { ... }
```

</td>

<td>

```javascript
class Stack {
  constructor() {
    this._storage = new List();
  }
}

class List { ... }
```

</td>
</tr>
</tbody>
</table>

Inheritance works so well that sometimes we make mistakes. Just because a class has some similarities with another, that doesn't mean that there's a true inheritance relationship between them. This refactoring helps with breaking these wrong links.

## Working example

Our working example contains scrolls and a catalog with items. Our `Scroll` class inherits from `CatalogItem`, which doesn't represent reality, since several scrolls can point to the same catalog item. Our goal is to break down this inheritance link.

### Test suite

Since we have many moving pieces, our test suite is quite complex. Please refer to the initial commit to check the full implementation.

### Steps

We start by creating an instance of `catalogItem` to `Scroll`:

```diff
Scroll extends CatalogItem {
   constructor(id, title, tags, dateLastCleaned) {
+    this._catalogItem = new CatalogItem(id, title, tags);
   }
```

This is the first step to start delegating behavior to the reference and, later, break down the inheritance link.

On to the delegations, we start with `id`:

```diff
export class Scroll extends CatalogItem {
+  get id() {
+    return this._catalogItem.id;
+  }
```

Then, `title`:

```diff
export class Scroll extends CatalogItem {
+  get title() {
+    return this._catalogItem.title;
+  }
```

And, then, `hasTag`:

```diff
export class Scroll extends CatalogItem {
+  hasTag(aString) {
+    return this._catalogItem.hasTag(aString);
+  }
```

Now we can formally break the inheritance link:

```diff
-export class Scroll extends CatalogItem {
+export class Scroll {
   constructor(id, title, tags, dateLastCleaned) {
-    super(id, title, tags);
   }
```

The main refactoring is done, but we still need to fix the modeling error (i.e.: linking one scroll to one catalog item). We start by defining a different `id` to `Scroll`, so it stops using `CatalogItem`'s:

```diff
 export class Scroll {
   constructor(id, title, tags, dateLastCleaned) {
-    this._catalogItem = new CatalogItem(id, title, tags);
+    this._id = id;
+    this._catalogItem = new CatalogItem(null, title, tags);
     this._lastCleaned = dateLastCleaned;
   }

   get id() {
-    return this._catalogItem.id;
+    return this._id;
   }
```

Then, as an intermediary step, we provide catalog data to `Scroll`:

```diff
-export function loadScrollsFrom(aDocument) {
+export function loadScrollsFrom(aDocument, catalog) {
   const scrolls = aDocument.map(
     record =>
       new Scroll(
         record.id,
         record.catalogData.title,
         record.catalogData.tags,
-        new ManagedDateTime(record.lastCleaned)
+        new ManagedDateTime(record.lastCleaned),
+        record.catalogData.id,
+        catalog
       )
   );
```

And now we can dynamically resolve `catalogItem` from `catalog` at `Scroll`:

```diff
 export class Scroll {
-  constructor(id, title, tags, dateLastCleaned) {
+  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
     this._id = id;
-    this._catalogItem = new CatalogItem(null, title, tags);
+    this._catalogItem = catalog.get(catalogID);
     this._lastCleaned = dateLastCleaned;
   }
```

Finally, we can now remove the now unused `title` and `tags` from `Scroll`:

```diff
 export class Scroll {
-  constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
+  constructor(id, dateLastCleaned, catalogID, catalog) {
     this._id = id;
     this._catalogItem = catalog.get(catalogID);
     this._lastCleaned = dateLastCleaned;
```

And that's it! Scroll no longer inherits from `CatalogItem`.

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                              | Message                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [1b8bf10](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/1b8bf10ba6f3734e2f7a59b8e87c025546d2c632) | add instance of `catalogItem` to `Scroll`                                        |
| [66fe0cd](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/66fe0cda5f10d10c066407d679f7844d1ef3669b) | delegate `id` to `catalogItem` at `Scroll`                                       |
| [e7e70d2](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/e7e70d200d2c8234117ac0e0562dea2723c342d8) | delegate `title` to `CatalogItem` at `Scroll`                                    |
| [d26ef79](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/d26ef792f9a3f579ef876dbf44b923e3cb8be5d2) | delegate `hasTag` to `catalogItem` at `Scroll`                                   |
| [07a4ed6](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/07a4ed68a49e2a61280e4ea109a48890b5b79ebd) | remove inheritance of `CatalogItem` from `Scroll`                                |
| [9c32850](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/9c32850692fefb1fa98abf88a91d60a2e40be40e) | set `id` as `Scroll`'s id and no longer `CatalogItem`'s                          |
| [47d9762](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/47d9762c36d3c0660b33f31fcdab707feee3a13a) | provide `catalogData.id` and `catalog` to `Scroll` at `loadScrollsFrom`          |
| [c393cac](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/c393caceebcf6e1b5dcc1f47eabbce6f37ce6a00) | dynamically resolve `catalogItem` from `catalog` at `Scroll` initialization time |
| [502b47b](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commit/502b47b7a020fba5c7e1f4b2175955fc84a6eeee) | remove `title` and `tags` from `Scroll`                                          |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/replace-superclass-with-delegate-refactoring/commits/main).
