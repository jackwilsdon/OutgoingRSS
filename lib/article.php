<?php

final class Article implements JsonSerializable {
  private $title;
  private $date;
  private $description;
  private $link;

  public function __construct($title, $date, $description, $link) {
    $this->title = $title;
    $this->date = $date;
    $this->description = $description;
    $this->link = $link;
  }

  public function getTitle() {
    return $this->title;
  }

  public function getDate() {
    return $this->date;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getLink() {
    return $this->link;
  }

  public function jsonSerialize() {
    return (object) array(
      'title' => $this->title,
      'date' => $this->date,
      'description' => $this->description,
      'link' => $this->link,
    );
  }
}
