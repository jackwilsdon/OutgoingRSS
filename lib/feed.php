<?php

abstract class Feed implements JsonSerializable {
  public abstract function getName();
  public abstract function getArticles();

  public final function jsonSerialize() {
    return (object) array(
      'name' => $this->getName(),
      'articles' => $this->getArticles()
    );
  }
}
